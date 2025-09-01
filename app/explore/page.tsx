import Header from '@/widgets/header/ui/header';
import TagFilter from '@/features/tag-filter/ui/tag-filter';
import SortTabs from '@/entities/shared-game/ui/sort-tab/sort-tabs';
import GameGrid from '@/entities/shared-game/ui/game-grid/game-grid';
import SearchBarContainer from '@/widgets/explore/ui/search-bar-container';

const Page = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await searchParams;
  const mode = q ? 'search' : 'filter';

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
        <GameGrid />
      </div>
    </>
  );
};

export default Page;
