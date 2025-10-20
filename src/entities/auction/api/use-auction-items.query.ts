import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAuctionItems } from './auction-api';
import type { AuctionItemsRequest } from '../model/types';

// 경매장 아이템 조회 (페이지네이션)
export const useAuctionItems = (filters: Omit<AuctionItemsRequest, 'pageIndex' | 'pageSize'>) => {
  return useInfiniteQuery({
    queryKey: ['auctionItems', filters],
    queryFn: ({ pageParam = 0 }) =>
      getAuctionItems({
        ...filters,
        pageIndex: pageParam,
        pageSize: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.currentPage < lastPage.pageInfo.totalPages - 1) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
  });
};

// 경매장 아이템 조회 (단일 페이지)
export const useAuctionItemsPage = (params: AuctionItemsRequest) => {
  return useQuery({
    queryKey: ['auctionItems', 'page', params],
    queryFn: () => getAuctionItems(params),
  });
};