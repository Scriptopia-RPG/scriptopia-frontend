import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/shared/utils/styles';
import { SORT_OPTIONS } from '../../model/constants';
import { SortKey } from '../../model/types';

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

  return (
    <ul role="tablist" className="m-0 mt-6 flex list-none items-center divide-x p-0">
      {SORT_OPTIONS.map(({ key, label }) => (
        <li key={key} role="none" className="flex items-center px-3">
          <button
            type="button"
            role="tab"
            aria-selected={current === key}
            onClick={() => handleSortSet(key)}
            className={cn('text-sm leading-none', current === key ? 'text-primary' : 'text-fg')}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SortTabs;
