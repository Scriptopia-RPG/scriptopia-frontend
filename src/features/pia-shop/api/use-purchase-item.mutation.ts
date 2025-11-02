import { useMutation, useQueryClient } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import { piaShopKeys } from './pia-shop.key';
import type { PurchaseRequest, PurchaseResponse } from '@/features/pia-shop/model/pia-shop.type';

const purchaseItem = async (request: PurchaseRequest): Promise<PurchaseResponse> => {
  return customFetch<PurchaseResponse>('/shops/pia/purchase', {
    method: 'POST',
    body: request,
  });
};

export const usePurchaseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchaseItem,
    onSuccess: () => {
      // 구매 후 잔액과 아이템 목록 갱신
      // queryClient.invalidateQueries({ queryKey: piaShopKeys.balance() });
      queryClient.invalidateQueries({ queryKey: piaShopKeys.items() });
    },
  });
};
