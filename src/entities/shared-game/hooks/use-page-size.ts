import { useTailwindBP } from '@/shared/hooks/use-tailwind-bp';

export const usePageSize = () => {
  const bp = useTailwindBP();
  return bp === 'lg' ? 12 : bp === 'sm' ? 8 : 9;
};
