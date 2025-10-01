'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTags } from '@/entities/shared-game/api/use-tags.query';
import { parseTagIds } from '@/shared/utils/parse-tag-ids';

import TagAddButton from '@/entities/shared-game/ui/tag/tag-add-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import ResetButton from '@/entities/shared-game/ui/tag/reset-button';
import TagSelectModal from '@/entities/shared-game/ui/tag/tag-select-modal';

const TagFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const { tags = [] } = useTags();

  const selectedTagIds = useMemo(() => {
    const ids = parseTagIds(searchParams.get('tags'));
    const valid = new Set(tags.map((t) => t.id));
    return ids.filter((id) => valid.has(id));
  }, [searchParams, tags]);

  const tagIdToName = useMemo(() => {
    return new Map(tags.map((tag) => [tag.id, tag.tagName]));
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
    <div className="flex gap-1.5 sm:gap-2.5">
      <div className="shrink-0">
        <TagAddButton onClick={() => setIsOpen(true)} />
      </div>
      <div className="scrollbar-none min-w-0 flex-1 overflow-x-auto">
        <div className="flex gap-1.5 whitespace-nowrap sm:gap-2.5">
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
      <div className="hidden shrink-0 sm:flex">
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
