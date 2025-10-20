// 아이템 효과 정보
export interface ItemEffect {
  effectProbability: string;
  effectName: string;
  description: string;
}

// 경매장 아이템 정보
export interface AuctionItem {
  userItemId: number;
  itemDefId: number;
  name: string;
  description: string;
  picSrc: string;
  remainingUses: number;
  tradeStatus: 'ON_SALE' | 'SOLD_OUT' | 'RESERVED';
  grade: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  category: string;
  durability?: number;
  effectGrades?: string[];
  baseStat: number;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
}

// 경매 정보
export interface AuctionListing {
  auctionId: number;
  price: number;
  createdAt: string;
  tradeAt?: string;
  item: AuctionItem;
}

// 페이지 정보
export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

// 전체 판매 아이템 조회 응답
export interface AuctionItemsResponse {
  content: AuctionListing[];
  pageInfo: PageInfo;
}

// 전체 판매 아이템 조회 요청 파라미터
export interface AuctionItemsRequest {
  pageIndex: number;
  pageSize: number;
  itemName?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  grade?: string;
  effectGrades?: string[];
  mainStat?: string;
}

// 내가 등록한 판매 아이템 정보
export interface MyAuctionItem {
  itemDefId: number;
  name: string;
  itemGrade: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  itemType: 'WEAPON' | 'ARMOR' | 'CONSUMABLE';
  mainStat: string;
  picSrc: string;
}

export interface MyAuction {
  auctionId: number;
  price: number;
  createdAt: string;
  item: AuctionItem;
  status: 'ON_SALE' | 'SOLD' | 'CANCELLED';
}

// 내가 등록한 판매 아이템 조회 응답
export interface MyAuctionsResponse {
  content: MyAuction[];
  pageInfo: {
    currentPage: number;
    pageSize: number;
  };
}

// 내가 등록한 판매 아이템 조회 요청 파라미터
export interface MyAuctionsRequest {
  pageIndex: number;
  pageSize: number;
  itemType?: string;
}

// 거래 기록 정보
export interface TradeHistory {
  transactionId: number;
  type: 'BUY' | 'SELL';
  price: number;
  timestamp: string;
  status: 'COMPLETED' | 'PROCESSING' | 'CANCELLED';
  tradeDate: string;
  item: AuctionItem;
  otherParty: string;
}

// 거래 기록 조회 응답
export interface TradeHistoryResponse {
  content: TradeHistory[];
  pageInfo: PageInfo;
}

// 거래 기록 조회 요청 파라미터
export interface TradeHistoryRequest {
  pageIndex: number;
  pageSize: number;
}

// 아이템 판매 등록 요청
export interface SellItemRequest {
  userItemId: number;
  price: number;
}

// 에러 응답
export interface ApiError {
  code: string;
  message: string;
  status: string;
}

// 검색 필터 옵션들
export const ITEM_CATEGORIES = [
  { value: 'WEAPON', label: '무기' },
  { value: 'ARMOR', label: '방어구' },
  { value: 'CONSUMABLE', label: '유물' },
] as const;

export const ITEM_GRADES = [
  { value: 'COMMON', label: '커먼', color: 'text-gray-400' },
  { value: 'UNCOMMON', label: '언커먼', color: 'text-green-400' },
  { value: 'RARE', label: '레어', color: 'text-blue-400' },
  { value: 'EPIC', label: '에픽', color: 'text-purple-400' },
  { value: 'LEGENDARY', label: '레전더리', color: 'text-yellow-400' },
] as const;

export const MAIN_STATS = [
  { value: 'STRENGTH', label: '힘' },
  { value: 'AGILITY', label: '민첩' },
  { value: 'INTELLIGENCE', label: '지능' },
  { value: 'LUCK', label: '운' },
  { value: 'DEFENSE', label: '방어' },
] as const;

export type ItemCategory = typeof ITEM_CATEGORIES[number]['value'];
export type ItemGrade = typeof ITEM_GRADES[number]['value'];
export type MainStat = typeof MAIN_STATS[number]['value'];