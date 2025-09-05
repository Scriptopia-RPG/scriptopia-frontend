'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import SearchBar from '@/shared/ui/input/search-bar';

const SearchBarContainer = ({ q }: { q: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [text, setText] = useState(q ?? '');

  const handleChange = (value: string) => {
    setText(value);
    router.replace(`${pathname}?q=${encodeURIComponent(value.trim())}`);
  };

  const handleClear = () => {
    setText('');
    router.replace(pathname);
  };

  return <SearchBar value={text} onChange={handleChange} onClear={handleClear} />;
};

export default SearchBarContainer;
