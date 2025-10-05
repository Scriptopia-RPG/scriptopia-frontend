import { useTailwindBP } from '@/shared/hooks/use-tailwind-bp';

export const usePageSize = () => {
  const bp = useTailwindBP();
  return bp === 'lg' || bp === 'sm' ? 8 : 9;
};
