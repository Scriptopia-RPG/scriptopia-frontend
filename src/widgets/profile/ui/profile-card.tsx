import Image from 'next/image';
import useAuthStore from '@/entities/auth/model/auth.store';
import { useUserAssets } from '@/entities/user/api/use-user-assets.query';

const ProfileCard = () => {
  const profile = useAuthStore((state) => state.profile);
  const { data: userAssets } = useUserAssets();

  if (!profile) return null;

  // 실제 API에서 받은 pia 값을 사용, fallback으로 profile의 pia 사용
  const pia = userAssets?.pia ?? profile.pia ?? 0;

  return (
    <section className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6 sm:p-8">
      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32">
          <Image
            src="/assets/프로필 사진.png"
            alt={profile.nickname}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{profile.nickname}</h1>
          <p className="text-sm text-gray-400 sm:text-base">{profile.email}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">게임 티켓</span>
              <span className="text-base font-semibold text-white">{profile.ticket} / {profile.ticketMax}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">피아</span>
              <span className="text-base font-semibold text-white">{pia.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
