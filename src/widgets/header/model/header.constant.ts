export interface NavItem {
  href: string;
  label: string;
  isActive?: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: '/games/play',
    label: '게임 플레이',
    isActive: (pathname) => pathname === '/games/play',
  },
  {
    href: '/shared-games',
    label: '탐색',
    isActive: (pathname) => pathname?.startsWith('/shared-games'),
  },
  {
    href: '/auction',
    label: '거래소',
    isActive: (pathname) => pathname?.startsWith('/auction'),
  },
  {
    href: '/pia-shop',
    label: '피아 상점',
    isActive: (pathname) => pathname === '/pia-shop',
  },
];
