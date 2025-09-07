import type { SharedGame } from '@/entities/shared-game/model/shared-game.type';

import GameCard from '@/entities/shared-game/ui/game-card/game-card';

interface GameGridProps {
  sharedGames: SharedGame[];
}

const GameGrid = ({ sharedGames }: GameGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-1.5 gap-y-12 sm:grid-cols-4 sm:gap-x-3 lg:grid-cols-6">
      {sharedGames?.map((sharedGame) => (
        <GameCard
          key={sharedGame.sharedGameUuid}
          sharedGameUuid={sharedGame.sharedGameUuid}
          thumbnail={sharedGame.thumbnail}
          title={sharedGame.title}
          totalPlayed={sharedGame.totalPlayed}
          tags={sharedGame.tags}
        />
      ))}
    </div>
  );
};

export default GameGrid;
