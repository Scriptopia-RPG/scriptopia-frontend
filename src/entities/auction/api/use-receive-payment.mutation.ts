import { useMutation, useQueryClient } from '@tanstack/react-query';
import { receivePayment } from './auction-api';

// 거래 대금 수령 (구매 완료 또는 판매 대금 수령)
export const useReceivePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transactionId: number) => receivePayment(transactionId),
    onSuccess: () => {
      // 거래 기록을 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['tradeHistory'] });
    },
  });
};