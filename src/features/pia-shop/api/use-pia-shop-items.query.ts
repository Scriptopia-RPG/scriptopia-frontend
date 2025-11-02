import { useQuery } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';
import type { PiaShopItemsResponse } from '@/features/pia-shop/model/pia-shop.type';

const getPiaShopItems = async (): Promise<PiaShopItemsResponse> => {
  return customFetch<PiaShopItemsResponse>('/shops/pia/items');
};

export const usePiaShopItems = () => {
  return useQuery({
    queryKey: ['pia-shop', 'items'],
    queryFn: getPiaShopItems,
  });
};
