import { SharedGame } from '@/entities/shared-game/model/types';

import GameCard from '@/entities/shared-game/ui/game-card/game-card';

interface GameGridProps {
  sharedGames: SharedGame[];
}

const GameGrid = ({ sharedGames }: GameGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-12 sm:grid-cols-4 lg:grid-cols-5">
      {sharedGames?.map((sharedGame) => (
        <GameCard
          key={sharedGame.sharedGameId}
          thumbnail={sharedGame.thumbnailUrl}
          title={sharedGame.title}
          tags={sharedGame.tags}
        />
      ))}
    </div>
  );
};

export default GameGrid;
