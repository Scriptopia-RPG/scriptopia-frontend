'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import useAuthStore from '@/entities/auth/model/auth.store';
import { NAV_ITEMS } from '@/widgets/header/model/header.constant';
import { useGame, fetchGame } from '@/entities/game/api/use-game.query';

import Logo from '@public/logo/logo.svg';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, clearAuth } = useAuthStore();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loggedIn = isMounted && isLoggedIn();

  useGame({ enabled: false });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  const handleLogout = () => {
    clearAuth();
    setIsProfileDropdownOpen(false);
    router.push('/');
  };

  const handlePlayClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const gameData = await fetchGame();
      router.push(`/games/play/${gameData.sessionId}`);
    } catch {
      router.push('/games/create');
    }
  };

  if (!loggedIn) {
    return (
      <header className="bg-bg fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-5 py-3 md:px-20 md:py-4">
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center gap-4 md:gap-8">
          <Link
            href="/auth/login"
            scroll={false}
            className="text-fg hover:text-primary text-sm font-medium transition-colors md:text-base"
          >
            로그인
          </Link>
          <Link
            href="/auth/signup"
            scroll={false}
            className="text-fg hover:text-primary text-sm font-medium transition-colors md:text-base"
          >
            회원가입
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-bg fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-5 py-3 md:px-20 md:py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center gap-4 md:flex md:gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = item.isActive ? item.isActive(pathname || '') : false;
            const isPlayButton = item.href === '/games/play';

            if (isPlayButton) {
              return (
                <button
                  key={item.href}
                  onClick={handlePlayClick}
                  className={`text-sm font-medium transition-colors md:text-base ${
                    isActive ? 'text-primary' : 'text-fg hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors md:text-base ${
                  isActive ? 'text-primary' : 'text-fg hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden items-center gap-3 md:flex md:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">티켓</span>
            <span className="text-sm font-semibold">{'0'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">피아</span>
            <span className="text-sm font-semibold">{'0'}</span>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="bg-gradient-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-white transition-all hover:opacity-90"
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="true"
          >
            <span className="text-sm font-semibold">{'U'}</span>
          </button>
          {isProfileDropdownOpen && (
            <div className="bg-bg absolute top-12 right-0 w-40 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex flex-col py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="hover:bg-surface text-fg px-4 py-2 text-left text-sm transition-colors"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-surface px-4 py-2 text-left text-sm text-gray-600 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
