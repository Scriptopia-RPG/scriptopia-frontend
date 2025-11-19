import type { SharedGame } from '@/entities/shared-game/model/shared-game.type';

import GameCard from '@/entities/shared-game/ui/game-card/game-card';

interface GameGridProps {
  sharedGames: SharedGame[];
}

const GameGrid = ({ sharedGames }: GameGridProps) => {
  return (
    <ul className="grid grid-cols-3 gap-x-1.5 gap-y-5 sm:grid-cols-4 sm:gap-x-3 sm:gap-y-12">
      {sharedGames
        ?.filter(
          (sharedGame): sharedGame is SharedGame =>
            sharedGame !== null &&
            sharedGame !== undefined &&
            sharedGame.sharedGameUuid !== null &&
            sharedGame.sharedGameUuid !== undefined,
        )
        .map((sharedGame) => (
          <li key={sharedGame.sharedGameUuid}>
            <GameCard
              sharedGameUuid={sharedGame.sharedGameUuid}
              thumbnailUrl={sharedGame.thumbnailUrl}
              title={sharedGame.title}
              playCount={sharedGame.playCount}
              tags={sharedGame.tags}
            />
          </li>
        ))}
    </ul>
  );
};

export default GameGrid;
