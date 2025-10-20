import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getSharedGames } from '@/entities/shared-game/api/use-shared-games.query';
import { parseTagIds } from '@/shared/utils/parse-tag-ids';
import { SortKey } from '@/entities/shared-game/model/shared-game.type';

import Header from '@/widgets/header/ui/header';
import TagFilter from '@/features/tag-filter/ui/tag-filter';
import SortTabs from '@/entities/shared-game/ui/sort-tab/sort-tabs';
import SearchBarContainer from '@/widgets/explore/ui/search-bar-container';
import GameGridInfinite from '@/entities/shared-game/ui/game-grid/game-grid-infinite';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const sp = await searchParams;
  const q = typeof sp.q === 'string' ? sp.q : '';
  const mode = q ? 'search' : 'filter';
  const sort = !q && typeof sp.sort === 'string' ? (sp.sort as SortKey) : undefined;
  const tags = !q && typeof sp.tags === 'string' ? sp.tags : '';
  const selectedTags = parseTagIds(tags);

  const queryClient = new QueryClient();

  if (mode === 'filter') {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['shared-games', { mode, sort, tags: selectedTags, query: q }],
      queryFn: ({ pageParam }) =>
        getSharedGames({
          mode,
          sort,
          tags: selectedTags,
          query: q,
          pageSize: 12,
          ...(pageParam ?? { isFirstPage: true }),
        }),
      initialPageParam: { isFirstPage: true },
    });
  }

  return (
    <div className="min-h-screen bg-[#151518] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10">
        {/* 헤더 섹션 */}
        <section className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">공유 게임 탐색</h1>
          <p className="text-gray-400 text-lg">다른 플레이어들이 만든 게임을 탐색하고 플레이해보세요</p>
        </section>

        {/* 검색 및 필터 섹션 */}
        <section className="space-y-6">
          <div className="bg-[#17171c] border border-[#2a2a32] rounded-3xl p-6">
            <SearchBarContainer q={q} />
          </div>
          
          {mode === 'filter' && (
            <div className="bg-[#17171c] border border-[#2a2a32] rounded-3xl p-6">
              <TagFilter />
            </div>
          )}
        </section>

        {/* 정렬 옵션 */}
        {mode === 'filter' && (
          <nav className="flex justify-end">
            <div className="bg-[#17171c] border border-[#2a2a32] rounded-2xl p-2">
              <SortTabs />
            </div>
          </nav>
        )}

        {/* 게임 목록 */}
        <section className="bg-[#17171c] border border-[#2a2a32] rounded-3xl p-6">
          <h2 className="sr-only">공유된 게임 목록</h2>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <GameGridInfinite mode={mode} sort={sort} tags={selectedTags} query={q} />
          </HydrationBoundary>
        </section>
      </main>
    </div>
  );
};

export default Page;
