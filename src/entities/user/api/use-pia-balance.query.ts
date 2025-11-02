import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

type PiaBalanceResponse = {
  pia: number;
};

const getPiaBalance = async (): Promise<PiaBalanceResponse> => {
  return customFetch<PiaBalanceResponse>('/users/me/assets');
};

export const usePiaBalance = () => {
  return useQuery({
    queryKey: ['pia-balance'],
    queryFn: getPiaBalance,
  });
};
