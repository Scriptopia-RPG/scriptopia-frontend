import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getSharedGames } from '@/entities/shared-game/model/use-shared-games.query';
import { parseTagIds } from '@/shared/utils/parse-tag-ids';
import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

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
  const q = (typeof sp.q === 'string' ? (sp.q as SortKey) : '').trim();
  const mode = q ? 'search' : 'filter';
  const sort = !q && typeof sp.sort === 'string' ? sp.sort : undefined;
  const tags = !q && typeof sp.tags === 'string' ? sp.tags : '';
  const selectedTags = parseTagIds(tags);

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['shared-games', { mode, sort, selectedTags, q }],
    queryFn: ({ pageParam }) =>
      getSharedGames({
        mode,
        sort,
        tags: selectedTags,
        query: q,
        pageSize: 10,
        ...(pageParam ?? { isFirstPage: true }),
      }),
    initialPageParam: { isFirstPage: true },
  });

  return (
    <div className="mb-14">
      <Header />
      <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-7 px-8">
        <div className="flex flex-col gap-5">
          <SearchBarContainer q={q} />
          {mode === 'filter' && <TagFilter />}
        </div>

        {mode === 'filter' && (
          <div className="flex justify-end">
            <SortTabs />
          </div>
        )}

        <HydrationBoundary state={dehydrate(queryClient)}>
          <GameGridInfinite mode={mode} sort={sort} tags={selectedTags} query={q} pageSize={10} />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Page;
