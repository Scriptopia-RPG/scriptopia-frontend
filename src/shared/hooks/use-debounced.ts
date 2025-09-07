import { useEffect, useState } from 'react';

export const useDebounced = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState<T>(() => value);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return debounced;
};
