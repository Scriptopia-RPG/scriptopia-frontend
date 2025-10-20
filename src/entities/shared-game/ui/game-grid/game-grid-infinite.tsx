'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useSharedGames } from '@/entities/shared-game/api/use-shared-games.query';
import { usePageSize } from '@/entities/shared-game/hooks/use-page-size';
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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">게임을 찾을 수 없습니다</h3>
          <p className="text-gray-400 max-w-md">
            {query ? `"${query}"에 대한 검색 결과가 없습니다.` : '현재 필터 조건에 맞는 게임이 없습니다.'}
            <br />
            다른 키워드나 필터를 시도해보세요.
          </p>
        </div>
        <div className="space-y-2 text-sm text-gray-500">
          <p>💡 <span className="text-gray-400">팁:</span> 더 넓은 범위로 검색해보세요</p>
          <p>🎮 <span className="text-gray-400">추천:</span> 태그나 정렬 옵션을 변경해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <GameGrid sharedGames={items} />
      
      {/* 더 보기 로딩 */}
      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">더 많은 게임을 불러오는 중...</span>
            </div>
          )}
        </div>
      )}

      {/* 초기 로딩 */}
      {isLoading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">게임을 불러오는 중...</p>
        </div>
      )}
    </>
  );
};

export default GameGridInfinite;
