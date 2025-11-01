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
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderLayout;
