'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTags } from '@/entities/tag/model/use-tags.query';

import TagAddButton from '@/entities/tag/ui/tag-add-button';
import Tag from '@/entities/tag/ui/tag';
import ResetButton from '@/entities/tag/ui/reset-button';

const TagFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tags } = useTags();

  const selectedTagIds = useMemo(() => {
    const params = searchParams.get('tags');
    if (!params) return [];

    return params.split(',').map(Number).filter(Number.isFinite);
  }, [searchParams]);

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
        <TagAddButton onClick={() => {}} />
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
    </div>
  );
};

export default TagFilter;
