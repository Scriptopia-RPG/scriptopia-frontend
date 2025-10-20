import { useQuery } from '@tanstack/react-query';
import { getTradeHistory } from './auction-api';
import type { TradeHistoryRequest } from '../model/types';

// 내 거래 기록 조회
export const useTradeHistory = (params: TradeHistoryRequest) => {
  return useQuery({
    queryKey: ['tradeHistory', params],
    queryFn: () => getTradeHistory(params),
  });
};