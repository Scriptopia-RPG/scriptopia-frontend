import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelAuction } from './auction-api';

// 판매 중인 아이템 등록 취소
export const useCancelAuction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (auctionId: number) => cancelAuction(auctionId),
    onSuccess: () => {
      // 내 경매 목록을 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['myAuctions'] });
    },
  });
};