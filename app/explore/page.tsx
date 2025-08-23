'use client';

import { useEffect, useState } from 'react';

import SearchBar from '@/shared/ui/search-bar/search-bar';

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
    <div className="mx-32 mt-12">
      <SearchBar value={q} onChange={setQ} onClear={() => setQ('')} />
      <div>태그</div>
      <div>정렬</div>
      <div>카드 리스트</div>
    </div>
  );
};

export default Page;
