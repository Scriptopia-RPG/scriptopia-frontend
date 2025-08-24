'use client';

import { useEffect, useState } from 'react';

import Header from '@/widgets/header/ui/header';
import SearchBar from '@/shared/ui/search-bar/search-bar';
import TagFilter from '@/features/search-query/ui/tag-filter/ui/tag-filter';

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

  return (
    <>
      <Header />
      <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-7 px-4">
        <div className="flex flex-col gap-5">
          <SearchBar value={q} onChange={setQ} onClear={() => setQ('')} />
          <TagFilter />
        </div>
        <div>정렬</div>
        <div>카드 리스트</div>
      </div>
    </>
  );
};

export default Page;
