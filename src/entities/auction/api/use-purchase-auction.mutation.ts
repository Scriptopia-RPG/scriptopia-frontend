import { useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseAuctionItem } from './auction-api';

// 경매장 아이템 구매
export const usePurchaseAuctionItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (auctionId: number) => purchaseAuctionItem(auctionId),
    onSuccess: () => {
      // 경매장 아이템 목록과 거래 기록을 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['auctionItems'] });
      queryClient.invalidateQueries({ queryKey: ['tradeHistory'] });
    },
  });
};