'use client';

import SearchBar from '@/shared/ui/search-bar/search-bar';
import { usePathname, useRouter } from 'next/navigation';

const SearchBarContainer = ({ q }: { q: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const next = value.trim();
    if (next.length === 0) {
      router.replace(pathname);
      return;
    }
    router.replace(`${pathname}?q=${encodeURIComponent(next)}`);
  };

  const handleClear = () => {
    router.replace(pathname);
  };

  return <SearchBar value={q} onChange={handleChange} onClear={handleClear} />;
};

export default SearchBarContainer;
