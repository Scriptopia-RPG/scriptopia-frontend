'use client';

import { useEffect, useState } from 'react';

import SearchBar from '@/shared/ui/search-bar/search-bar';
import TagAddButton from '@/entities/tag/ui/tag-add-button';
import Tag from '@/entities/tag/ui/tag';
import ResetButton from '@/entities/tag/ui/reset-button';
import Header from '@/widgets/header/ui/header';

const Page = () => {
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState(q);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    if (!debounced) return;
    // API 요청
    console.log(debounced);
  }, [debounced]);

  const tags = [
    { tagId: 0, tagName: '로맨스' },
    { tagId: 1, tagName: '공포' },
    { tagId: 2, tagName: '추리' },
    { tagId: 3, tagName: '시뮬레이션' },
    { tagId: 4, tagName: '아포칼립스' },
  ];

  const [selectedTags, setSelectedTags] = useState(tags);

  return (
    <>
      <Header />
      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-7 px-[clamp(12px,4vw,32px)]">
        <div className="flex flex-col gap-5">
          <SearchBar value={q} onChange={setQ} onClear={() => setQ('')} />
          <div className="flex gap-2.5">
            <div className="shrink-0">
              <TagAddButton onClick={() => {}} />
            </div>
            <div className="min-w-0 flex-1 overflow-x-auto">
              <div className="flex gap-2.5 whitespace-nowrap">
                {selectedTags.map((tag) => (
                  <Tag
                    key={tag.tagId}
                    name={tag.tagName}
                    selected
                    removable
                    onRemove={() =>
                      setSelectedTags((prev) => prev.filter((t) => t.tagId !== tag.tagId))
                    }
                  />
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <ResetButton onClick={() => setSelectedTags([])} />
            </div>
          </div>
        </div>
        <div>정렬</div>
        <div>카드 리스트</div>
      </div>
    </>
  );
};

export default Page;
