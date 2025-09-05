'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useSharedGames } from '@/entities/shared-game/api/use-shared-games.query';
import { usePageSize } from '@/entities/shared-game/model/use-page-size';
import { useDebounced } from '@/shared/hooks/use-debounced';
import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

import GameGrid from '@/entities/shared-game/ui/game-grid/game-grid';

interface GameGridInfiniteProps {
  mode: 'filter' | 'search';
  sort?: SortKey;
  tags?: number[];
  query?: string;
}

const GameGridInfinite = ({ mode, sort, tags, query }: GameGridInfiniteProps) => {
  const pageSize = usePageSize();
  const debouncedQ = useDebounced(query);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = useSharedGames({
    mode,
    sort,
    tags,
    query: mode === 'search' ? debouncedQ : '',
    pageSize,
  });

  const items = useMemo(() => data?.pages.flatMap((p) => p.sharedGames) ?? [], [data]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && fetchNextPage(),
      { rootMargin: '160px' },
    );

    const el = sentinelRef.current;
    if (el) {
      io.observe(el);
    }

    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!isLoading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">표시할 게임이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <GameGrid sharedGames={items} />
      {hasNextPage && <div ref={sentinelRef} className="col-span-full h-10" />}
    </>
  );
};

export default GameGridInfinite;
