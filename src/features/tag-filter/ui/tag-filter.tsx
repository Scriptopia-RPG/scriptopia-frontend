'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTags } from '@/entities/shared-game/model/use-tags.query';

import TagAddButton from '@/entities/shared-game/ui/tag/tag-add-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import ResetButton from '@/entities/shared-game/ui/tag/reset-button';
import TagSelectModal from '@/entities/shared-game/ui/tag/tag-select-modal';

const TagFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const { tags } = useTags();

  const selectedTagIds = useMemo(() => {
    const raw = searchParams.get('tags') ?? '';
    const ids = raw
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .map(Number);

    const valid = new Set(tags.map((t) => t.tagId));
    return Array.from(new Set(ids.filter((id) => valid.has(id))));
  }, [searchParams, tags]);
  console.log(selectedTagIds);

  const tagIdToName = useMemo(() => {
    return new Map(tags.map((tag) => [tag.tagId, tag.tagName]));
  }, [tags]);

  const removeOne = (id: number) => {
    const next = selectedTagIds.filter((x) => x !== id);
    const nextParams = new URLSearchParams(searchParams.toString());

    if (next.length) {
      nextParams.set('tags', next.join(','));
    } else {
      nextParams.delete('tags');
    }

    router.replace(`${pathname}?${nextParams.toString()}`);
  };

  const resetAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('tags');
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2.5">
      <div className="shrink-0">
        <TagAddButton onClick={() => setIsOpen(true)} />
      </div>
      <div className="min-w-0 flex-1 overflow-x-auto">
        <div className="flex gap-2.5 whitespace-nowrap">
          {selectedTagIds.map((id) => (
            <Tag
              key={id}
              name={tagIdToName.get(id) ?? ''}
              selected
              removable
              onRemove={() => removeOne(id)}
            />
          ))}
        </div>
      </div>
      <div className="shrink-0">
        <ResetButton onClick={resetAll} />
      </div>

      <TagSelectModal
        isOpen={isOpen}
        initialSelected={selectedTagIds}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TagFilter;
