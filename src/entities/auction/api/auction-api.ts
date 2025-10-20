import customFetch from '@/shared/api/custom-fetch';
import type {
  AuctionItemsResponse,
  AuctionItemsRequest,
  MyAuctionsResponse,
  MyAuctionsRequest,
  TradeHistoryResponse,
  TradeHistoryRequest,
  SellItemRequest,
} from '../model/types';

// 전체 판매 아이템 조회
export const getAuctionItems = async (params: AuctionItemsRequest): Promise<AuctionItemsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('pageIndex', params.pageIndex.toString());
  searchParams.set('pageSize', params.pageSize.toString());
  if (params.itemName) searchParams.set('itemName', params.itemName);
  if (params.category) searchParams.set('category', params.category);
  if (params.minPrice) searchParams.set('minPrice', params.minPrice.toString());
  if (params.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString());
  if (params.grade) searchParams.set('grade', params.grade);
  if (params.effectGrades) searchParams.set('effectGrades', params.effectGrades.join(','));
  if (params.mainStat) searchParams.set('mainStat', params.mainStat);

  return customFetch<AuctionItemsResponse>(`/api/trades?${searchParams.toString()}`, {
    method: 'GET',
  });
};

// 경매장 아이템 구매
export const purchaseAuctionItem = async (auctionId: number): Promise<{ message: string }> => {
  return customFetch<{ message: string }>(`/api/trades/${auctionId}/purchase`, {
    method: 'POST',
    body: {},
  });
};

// 내가 등록한 판매 아이템 조회
export const getMyAuctions = async (params: MyAuctionsRequest): Promise<MyAuctionsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('pageIndex', params.pageIndex.toString());
  searchParams.set('pageSize', params.pageSize.toString());
  if (params.itemType) searchParams.set('itemType', params.itemType);

  return customFetch<MyAuctionsResponse>(`/api/trades/me?${searchParams.toString()}`, {
    method: 'GET',
  });
};

// 아이템 판매 등록
export const sellItem = async (params: SellItemRequest): Promise<{ message: string }> => {
  return customFetch<{ message: string }>('/api/trades', {
    method: 'POST',
    body: {
      itemDefId: params.userItemId.toString(),
      price: params.price,
    },
  });
};

// 판매 중인 아이템 등록 취소
export const cancelAuction = async (auctionId: number): Promise<{ message: string }> => {
  return customFetch<{ message: string }>(`/api/trades/${auctionId}`, {
    method: 'DELETE',
  });
};

// 내 거래 기록 조회
export const getTradeHistory = async (params: TradeHistoryRequest): Promise<TradeHistoryResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('pageIndex', params.pageIndex.toString());
  searchParams.set('pageSize', params.pageSize.toString());

  return customFetch<TradeHistoryResponse>(`/api/trades/me/history?${searchParams.toString()}`, {
    method: 'GET',
  });
};

// 거래 대금 수령 (구매 완료 또는 판매 대금 수령)
export const receivePayment = async (transactionId: number): Promise<{ message: string }> => {
  return customFetch<{ message: string }>(`/api/trades/${transactionId}/confirm`, {
    method: 'POST',
    body: {},
  });
};