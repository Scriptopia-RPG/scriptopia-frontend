import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellItem } from './auction-api';
import type { SellItemRequest } from '../model/types';

// 아이템 판매 등록
export const useSellItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SellItemRequest) => sellItem(params),
    onSuccess: () => {
      // 내 경매 목록을 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['myAuctions'] });
    },
  });
};