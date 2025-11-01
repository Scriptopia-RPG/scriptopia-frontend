'use client';

import { usePathname } from 'next/navigation';

import Header from '@/widgets/header/ui/header';

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isGamePlayPage = pathname?.startsWith('/games/play');

  return (
    <>
      {isGamePlayPage ? (
        <div className="hidden md:block">
          <Header />
        </div>
      ) : (
        <Header />
      )}
      {children}
    </>
  );
};

export default HeaderLayout;
