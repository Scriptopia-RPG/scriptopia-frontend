'use client';

import { useEffect } from 'react';
import { useSharedGames } from '../../model/use-shared-games.query';
import GameCard from './game-card';

const GameCardList = () => {
  const { data: sharedGames = [], isLoading, isError, error } = useSharedGames({ mode: 'filter' });

  useEffect(() => {
    console.log(sharedGames);
  }, [sharedGames]);

  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-12 sm:grid-cols-4 lg:grid-cols-5">
      {sharedGames &&
        sharedGames.map((sharedGame) => (
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

export default GameCardList;
