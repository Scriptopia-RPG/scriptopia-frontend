import { useQuery } from '@tanstack/react-query';
import { getMyAuctions } from './auction-api';
import type { MyAuctionsRequest } from '../model/types';

// 내가 등록한 판매 아이템 조회
export const useMyAuctions = (params: MyAuctionsRequest) => {
  return useQuery({
    queryKey: ['myAuctions', params],
    queryFn: () => getMyAuctions(params),
  });
};