import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { prefetchSharedGames } from '@/entities/shared-game/api/use-shared-games.query';
import { parseTagIds } from '@/shared/utils/parse-tag-ids';
import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

import Header from '@/widgets/header/ui/header';
import TagFilter from '@/features/tag-filter/ui/tag-filter';
import SortTabs from '@/entities/shared-game/ui/sort-tab/sort-tabs';
import SearchBarContainer from '@/features/shared-game-search/ui/search-bar-container';
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
    await prefetchSharedGames(queryClient, {
      sort,
      tags: selectedTags,
      query: q,
      pageSize: 12,
    });
  }

  return (
    <div className="mb-14">
      <Header />
      <main className="mx-auto mt-7 flex w-full max-w-4xl flex-col gap-7 px-3.5 sm:px-14">
        <h1 className="sr-only">공유된 게임 탐색</h1>
        <section className="flex flex-col gap-5">
          <h2 className="sr-only">탐색 제어</h2>
          <SearchBarContainer q={q} />
          {mode === 'filter' && <TagFilter />}
        </section>

        {mode === 'filter' && (
          <nav className="flex justify-end">
            <SortTabs />
          </nav>
        )}

        <section>
          <h2 className="sr-only">공유된 게임 목록</h2>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <GameGridInfinite sort={sort} tags={selectedTags} query={q} />
          </HydrationBoundary>
        </section>
      </main>
    </div>
  );
};

export default Page;
