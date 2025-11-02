'use client';

import { usePathname } from 'next/navigation';

import Header from '@/widgets/header/ui/header';

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith('/games/play');

  if (hideHeader) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default HeaderLayout;
