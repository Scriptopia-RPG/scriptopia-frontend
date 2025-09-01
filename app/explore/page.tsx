import { getSharedGames } from '@/entities/shared-game/model/use-shared-games.query';

import Header from '@/widgets/header/ui/header';
import TagFilter from '@/features/tag-filter/ui/tag-filter';
import SortTabs from '@/entities/shared-game/ui/sort-tab/sort-tabs';
import GameGrid from '@/entities/shared-game/ui/game-grid/game-grid';
import SearchBarContainer from '@/widgets/explore/ui/search-bar-container';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const sp = await searchParams;
  const q = (typeof sp.q === 'string' ? sp.q : '').trim();
  const mode = q ? 'search' : 'filter';
  const sort = !q && typeof sp.sort === 'string' ? sp.sort : undefined;
  const tags = !q && typeof sp.tags === 'string' ? sp.tags : undefined;

  const { sharedGames } = await getSharedGames({
    mode: mode,
    sort: sort,
    tags: tags?.split(',').map(Number),
    query: q,
  });

  return (
    <>
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
        <GameGrid sharedGames={sharedGames} />
      </div>
    </>
  );
};

export default Page;
