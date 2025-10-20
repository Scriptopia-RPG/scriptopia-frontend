import type { SharedGame } from '@/entities/shared-game/model/shared-game.type';

import GameCard from '@/entities/shared-game/ui/game-card/game-card';

interface GameGridProps {
  sharedGames: SharedGame[];
}

const GameGrid = ({ sharedGames }: GameGridProps) => {
  return (
    <div>
      {/* 게임 개수 표시 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">발견된 게임</span>
          <span className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded-full">
            {sharedGames?.length || 0}
          </span>
        </div>
        <div className="text-gray-400 text-sm">
          다양한 모험이 당신을 기다리고 있습니다
        </div>
      </div>

      {/* 게임 그리드 - 카드 높이 일정하게 맞추기 */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {sharedGames?.map((sharedGame) => (
          <li key={sharedGame.sharedGameUuid} className="h-full">
            <GameCard
              sharedGameUuid={sharedGame.sharedGameUuid}
              thumbnail={sharedGame.thumbnail}
              title={sharedGame.title}
              totalPlayed={sharedGame.totalPlayed}
              tags={sharedGame.tags}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameGrid;
