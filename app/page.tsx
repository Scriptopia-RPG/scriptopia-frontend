import HeroSection from '@/widgets/landing/ui/hero-section';
import LandingHeader from '@/widgets/landing/ui/landing-header';
import GameSection from '@/widgets/landing/ui/game-section';
import FooterCTA from '@/widgets/landing/ui/footer-cta';
import { getSharedGames } from '@/entities/shared-game/api/use-shared-games.query';
import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

const fetchLandingGames = async (sort: SortKey) => {
  const response = await getSharedGames({
    mode: 'filter',
    sort,
    tags: [],
    query: '',
    pageSize: 6,
    isFirstPage: true,
  });

  return response.sharedGames.slice(0, 6);
};

const Home = async () => {
  const [popularGames, latestGames] = await Promise.all([
    fetchLandingGames('popular'),
    fetchLandingGames('latest'),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#151518] to-[#0a0a0d] text-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/3 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
      
      <LandingHeader />
      <main className="relative w-full flex flex-col gap-32 pb-32">
        <div className="px-4 sm:px-8">
          <HeroSection />
        </div>
        
        {/* 섹션 구분선 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"></div>
        
        <div className="px-4 sm:px-8">
          <GameSection
            title="누군가의 이야기, 당신의 모험"
            subtitle="다른 이의 상상으로 또 다른 세계를 플레이하세요. 인기 있는 모험들을 만나보세요."
            games={popularGames}
          />
        </div>
        
        {/* 섹션 구분선 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"></div>
        
        <div className="px-4 sm:px-8">
          <GameSection
            title="최신 이야기"
            subtitle="방금 공유된 따끈한 모험을 가장 먼저 만나보세요. 새로운 이야기가 기다리고 있습니다."
            games={latestGames}
          />
        </div>
        
        {/* 하단 장식 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
      </main>
      <FooterCTA />
    </div>
  );
};

export default Home;
