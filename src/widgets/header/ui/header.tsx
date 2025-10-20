"use client";

import Image from 'next/image';
import Link from 'next/link';

import useAuthStore from '@/entities/auth/model/auth.store';
import { useUserAssets } from '@/entities/user/api/use-user-assets.query';

const Header = () => {
  const profile = useAuthStore((state) => state.profile);
  const { data: userAssets } = useUserAssets();

  if (!profile) {
    return (
      <header className="flex items-center justify-between px-6 py-6 sm:px-12">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="sr-only">Scriptopia 홈</span>
          <Image src="/logo/logo-text.svg" alt="Scriptopia" width={160} height={40} />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-200">
          <Link href="/auth/login" className="transition hover:text-primary">
            로그인
          </Link>
          <Link href="/auth/signup" className="transition hover:text-primary">
            회원가입
          </Link>
        </nav>
      </header>
    );
  }

  const { 
    ticket = 3, 
    ticketMax = 5, 
    status = profile.nickname 
  } = profile;
  
  // 실제 API에서 받은 pia 값을 사용, fallback으로 profile의 pia 사용
  const pia = userAssets?.pia ?? profile.pia ?? 5000;

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-6 text-gray-200 sm:px-12">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="sr-only">Scriptopia 홈</span>
          <Image src="/logo/logo-text.svg" alt="Scriptopia" width={160} height={40} />
        </Link>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link href="/play" className="transition hover:text-primary">
            게임 플레이
          </Link>
          <Link href="/explore" className="transition hover:text-primary">
            탐색
          </Link>
          <Link href="/auction" className="transition hover:text-primary">
            거래소
          </Link>
          <Link href="/pia" className="transition hover:text-primary">
            피아 상점
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Image src="/assets/게임 티켓.svg" alt="게임 티켓" width={28} height={28} />
          <span className="text-white">
            {ticket} / {ticketMax}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/assets/피아 화폐.svg" alt="피아 화폐" width={28} height={28} />
          <span className="text-white">{pia.toLocaleString()}</span>
        </div>
        <Link 
          href="/profile" 
          className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
          title="프로필 페이지로 이동"
        >
          {status}
        </Link>
      </div>
    </header>
  );
};

export default Header;
