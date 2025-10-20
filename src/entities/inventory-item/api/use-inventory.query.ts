import { useQuery } from '@tanstack/react-query';
import customFetch from '@/shared/api/custom-fetch';
import { InventoryResponse } from '../model/types';

const getInventory = async () => {
  return customFetch<InventoryResponse>('/api/users/me/items/game', {
    method: 'GET',
  });
};

export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory,
  });
};
