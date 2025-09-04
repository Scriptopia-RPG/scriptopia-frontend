'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SearchBar from '@/shared/ui/input/search-bar';

export default function SearchQuery() {
  const router = useRouter();
  const sp = useSearchParams();

  const urlQ = sp.get('q') ?? '';
  const [q, setQ] = useState(urlQ);

  // URL 외부에서 바뀐 경우 입력창 반영
  useEffect(() => setQ(urlQ), [urlQ]);

  // 디바운스 후 URL 반영
  useEffect(() => {
    const t = setTimeout(() => {
      const next = setParam(sp, 'q', q || undefined);
      router.replace(`?${next.toString()}`, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [q, router, sp]);

  return <SearchBar value={q} onChange={setQ} onClear={() => setQ('')} />;
}
