import { useEffect, useState } from 'react';

type BP = 'base' | 'sm' | 'lg'; // base < 640, sm ≥ 640, lg ≥ 1024

const getInitialBP = (): BP => {
  if (typeof window === 'undefined') return 'base'; // SSR 보호
  const mqLg = window.matchMedia('(min-width: 1024px)');
  const mqSm = window.matchMedia('(min-width: 640px)');
  return mqLg.matches ? 'lg' : mqSm.matches ? 'sm' : 'base';
};

export const useTailwindBP = (): BP => {
  const [bp, setBp] = useState<BP>(() => getInitialBP()); // ← 포인트

  useEffect(() => {
    const mqSm = window.matchMedia('(min-width: 640px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const update = () => setBp(mqLg.matches ? 'lg' : mqSm.matches ? 'sm' : 'base');

    mqSm.addEventListener('change', update);
    mqLg.addEventListener('change', update);
    return () => {
      mqSm.removeEventListener('change', update);
      mqLg.removeEventListener('change', update);
    };
  }, []);

  return bp;
};
