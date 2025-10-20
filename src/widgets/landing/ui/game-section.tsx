import GameCard from '@/entities/shared-game/ui/game-card/game-card';
import type { SharedGame } from '@/entities/shared-game/model/shared-game.type';

interface GameSectionProps {
  title: string;
  subtitle: string;
  games: SharedGame[];
}

const GameSection = ({ title, subtitle, games }: GameSectionProps) => {
  return (
    <section className="flex flex-col gap-12">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <div className="relative">
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text sm:text-4xl">
            {title}
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
        <p className="max-w-3xl text-base text-gray-300 sm:text-lg leading-relaxed">{subtitle}</p>
      </div>
      
      {/* 게임 그리드 */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {games.map((game) => (
            <GameCard key={game.sharedGameUuid} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameSection;
