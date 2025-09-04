'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useSharedGames } from '@/entities/shared-game/model/use-shared-games.query';
import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

import GameGrid from '@/entities/shared-game/ui/game-grid/game-grid';
import { usePageSize } from '@/entities/shared-game/model/use-page-size';

interface GameGridInfiniteProps {
  mode: 'filter' | 'search';
  sort?: SortKey;
  tags?: number[];
  query?: string;
}

const GameGridInfinite = ({ mode, sort, tags, query }: GameGridInfiniteProps) => {
  const pageSize = usePageSize();
  const q = useSharedGames({ mode, sort, tags, query, pageSize });

  const items = useMemo(() => q.data?.pages.flatMap((p) => p.sharedGames) ?? [], [q.data]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!q.hasNextPage || q.isFetchingNextPage) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && q.fetchNextPage(),
      { rootMargin: '160px' },
    );

    const el = sentinelRef.current;
    if (el) {
      io.observe(el);
    }

    return () => io.disconnect();
  }, [q]);

  return (
    <>
      <GameGrid sharedGames={items} />
      {q.isFetchingNextPage && <p className="col-span-full mt-4 text-center text-sm">Loading…</p>}
      {q.hasNextPage && <div ref={sentinelRef} className="col-span-full h-10" />}
    </>
  );
};

export default GameGridInfinite;
