import { useInfiniteQuery } from '@tanstack/react-query';
import customFetch from '@/shared/api/custom-fetch';
import { GameHistoryResponse } from '../model/types';

const getGameHistory = async ({ pageParam }: { pageParam: string | null }) => {
  let url = '/users/me/games/histories?size=10';
  if (pageParam) {
    url += `&lastId=${pageParam}`;
  }

  return customFetch<GameHistoryResponse>(url);
};

export const useGameHistory = () => {
  return useInfiniteQuery({
    queryKey: ['gameHistory'],
    queryFn: getGameHistory,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
