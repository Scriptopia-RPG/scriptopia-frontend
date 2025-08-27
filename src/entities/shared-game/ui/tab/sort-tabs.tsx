import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SortKey } from '@/entities/shared-game/model/types';
import { SORT_OPTIONS } from '@/entities/shared-game/model/constants';

import Tabs from '@/shared/ui/tabs/tabs';

const SortTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = (searchParams.get('sort') as SortKey) ?? 'popular';

  const handleSortSet = (key: SortKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', key);
    router.replace(`${pathname}?${params}`);
  };

  return <Tabs options={SORT_OPTIONS} current={current} onChange={handleSortSet} />;
};

export default SortTabs;
