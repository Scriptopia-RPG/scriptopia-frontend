"use client";

import { useRouter } from 'next/navigation';
import Header from '@/widgets/header/ui/header';
import { useExistingGame } from '@/features/game-manage/api/use-game-manage.mutation';
import useAuthStore from '@/entities/auth/model/auth.store';
import ProfileCard from '@/widgets/profile/ui/profile-card';
import InProgressGame from '@/widgets/profile/ui/in-progress-game';
import ProfileTabs from '@/widgets/profile/ui/profile-tabs';

const ProfilePage = () => {
  const router = useRouter();
  const profile = useAuthStore((state) => state.profile);
  
  const { data: existingGame, isLoading: isLoadingGame } = useExistingGame();
  
  
  

  // 로그인하지 않은 경우
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#151518] text-white">
        <Header />
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-300 mb-4">로그인이 필요합니다</h1>
            <p className="text-gray-400 mb-6">프로필을 확인하려면 로그인해주세요.</p>
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-gradient-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition"
            >
              로그인하기
            </button>
          </div>
        </main>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#151518] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:px-8">
        <ProfileCard />
        <InProgressGame existingGame={existingGame} isLoading={isLoadingGame} />
        <ProfileTabs />
      </main>
    </div>
  );
};

export default ProfilePage;