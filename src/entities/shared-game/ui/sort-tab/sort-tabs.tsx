'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SORT_OPTIONS } from '@/entities/shared-game/model/shared-game.constant';
import type { SortKey } from '@/entities/shared-game/model/shared-game.type';

import Tabs from '@/shared/ui/tabs/tabs';

const SortTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sp = searchParams.get('sort');
  const current =
    sp && SORT_OPTIONS.some((o) => o.key === sp) ? (sp as SortKey) : SORT_OPTIONS[0].key;

  const handleSortSet = (key: SortKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', key);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return <Tabs options={SORT_OPTIONS} current={current} onChange={handleSortSet} />;
};

export default SortTabs;
