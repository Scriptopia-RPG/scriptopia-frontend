'use client';

import { usePathname, useRouter } from 'next/navigation';

import SearchBar from '@/shared/ui/input/search-bar';
import { useEffect, useRef, useState, useTransition } from 'react';

const useDebounced = <T,>(value: T, delay = 250) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

const SearchBarContainer = ({ q }: { q: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  // 1) URL에서 온 초기값을 로컬 state에 보관 (IME 안전)
  const [text, setText] = useState(q ?? '');
  const isComposingRef = useRef(false);

  // 2) 디바운스된 값 (검색/URL 반영은 이걸 기준으로)
  const debouncedText = useDebounced(text);

  // 3) q가 바뀌면 로컬도 동기화
  useEffect(() => {
    setText(q ?? '');
  }, [q]);

  // 4) 디바운스된 값이 바뀌고, 조합 중이 아닐 때만 URL 소프트 네비게이션
  useEffect(() => {
    if (isComposingRef.current) {
      return;
    }

    startTransition(() => {
      if (!debouncedText) {
        router.replace(pathname);
      } else {
        router.replace(`${pathname}?q=${encodeURIComponent(debouncedText.trim())}`);
      }
    });
  }, [debouncedText, pathname, router]);

  const handleChange = (value: string) => setText(value);

  const handleClear = () => {
    setText('');
    startTransition(() => router.replace(pathname));
  };

  return (
    <SearchBar
      value={text}
      onChange={handleChange}
      onClear={handleClear}
      onCompositionStart={() => {
        isComposingRef.current = true;
      }}
      onCompositionEnd={() => {
        isComposingRef.current = false;
      }}
    />
  );
};

export default SearchBarContainer;
