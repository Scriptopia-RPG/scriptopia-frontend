'use client';

import { useEffect, useState } from 'react';

import Header from '@/widgets/header/ui/header';
import SearchBar from '@/shared/ui/search-bar/search-bar';
import TagFilter from '@/features/tag-filter/ui/tag-filter';
import SortTabs from '@/entities/shared-game/ui/sort-tab/sort-tabs';
import GameCardList from '@/entities/shared-game/ui/game-card/game-card-list';

const Page = () => {
  type Mode = 'search' | 'filter';
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState(q);
  const mode: Mode = debounced ? 'search' : 'filter';

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
      <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-7 px-8">
        <div className="flex flex-col gap-5">
          <SearchBar value={q} onChange={setQ} onClear={() => setQ('')} />
          {mode === 'filter' && <TagFilter />}
        </div>
        {mode === 'filter' && (
          <div className="flex justify-end">
            <SortTabs />
          </div>
        )}
        <GameCardList />
      </div>
    </>
  );
};

export default Page;
