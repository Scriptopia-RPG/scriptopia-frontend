import { http, HttpResponse, type JsonBodyType } from 'msw';
import type { 
  AuctionItemsRequest, 
  AuctionItemsResponse, 
  MyAuctionsRequest,
  MyAuctionsResponse,
  TradeHistoryRequest,
  TradeHistoryResponse,
  SellItemRequest 
} from '@/entities/auction/model/types';
import { 
  MOCK_AUCTION_ITEMS,
  MOCK_USER_ITEMS,
  MOCK_MY_AUCTIONS,
  MOCK_TRADE_HISTORY,
  MOCK_USER_CURRENCY,
  getNextAuctionId,
  type UserGameItem
} from '@/shared/api/fixtures/auction.mock';

const jsonResponse = <T extends JsonBodyType>(status: number, body: T) =>
  HttpResponse.json(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const jsonError = (status: number, body: { code: string; message: string; status: string }) =>
  new HttpResponse(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

// 필터링 헬퍼 함수들
const filterByName = (items: typeof MOCK_AUCTION_ITEMS, name?: string) => {
  if (!name) return items;
  return items.filter(item => 
    item.item.name.toLowerCase().includes(name.toLowerCase()) ||
    item.item.description.toLowerCase().includes(name.toLowerCase())
  );
};

const filterByCategory = (items: typeof MOCK_AUCTION_ITEMS, category?: string) => {
  if (!category) return items;
  return items.filter(item => item.item.category === category);
};

const filterByGrade = (items: typeof MOCK_AUCTION_ITEMS, grade?: string) => {
  if (!grade) return items;
  return items.filter(item => item.item.grade === grade);
};

const filterByPriceRange = (items: typeof MOCK_AUCTION_ITEMS, minPrice?: number, maxPrice?: number) => {
  return items.filter(item => {
    if (minPrice && item.price < minPrice) return false;
    if (maxPrice && item.price > maxPrice) return false;
    return true;
  });
};

const filterByMainStat = (items: typeof MOCK_AUCTION_ITEMS, mainStat?: string) => {
  if (!mainStat) return items;
  return items.filter(item => {
    switch (mainStat) {
      case 'strength':
        return item.item.strength > 0;
      case 'agility':
        return item.item.agility > 0;
      case 'intelligence':
        return item.item.intelligence > 0;
      case 'luck':
        return item.item.luck > 0;
      default:
        return true;
    }
  });
};

// 페이지네이션 헬퍼 함수
const paginate = <T>(items: T[], pageIndex: number, pageSize: number) => {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    content: paginatedItems,
    pageInfo: {
      currentPage: pageIndex,
      pageSize: pageSize,
      totalPages: Math.ceil(items.length / pageSize),
      totalItems: items.length,
    },
  };
};

export const auctionHandlers = [
  // GET /api/trades - 전체 판매 아이템 조회
  http.get('*/api/trades', async ({ request }) => {
    const url = new URL(request.url);
    const params: AuctionItemsRequest = {
      pageIndex: parseInt(url.searchParams.get('pageIndex') || '0'),
      pageSize: parseInt(url.searchParams.get('pageSize') || '10'),
      itemName: url.searchParams.get('itemName') || undefined,
      category: url.searchParams.get('category') || undefined,
      minPrice: url.searchParams.get('minPrice') ? parseInt(url.searchParams.get('minPrice')!) : undefined,
      maxPrice: url.searchParams.get('maxPrice') ? parseInt(url.searchParams.get('maxPrice')!) : undefined,
      grade: url.searchParams.get('grade') || undefined,
      effectGrades: url.searchParams.get('effectGrades')?.split(',') || undefined,
      mainStat: url.searchParams.get('mainStat') || undefined,
    };

    // 필터링 적용
    let filteredItems = [...MOCK_AUCTION_ITEMS];
    filteredItems = filterByName(filteredItems, params.itemName);
    filteredItems = filterByCategory(filteredItems, params.category);
    filteredItems = filterByGrade(filteredItems, params.grade);
    filteredItems = filterByPriceRange(filteredItems, params.minPrice, params.maxPrice);
    filteredItems = filterByMainStat(filteredItems, params.mainStat);

    // 페이지네이션 적용
    const result = paginate(filteredItems, params.pageIndex, params.pageSize);

    return jsonResponse<AuctionItemsResponse>(200, result);
  }),

  // POST /api/trades - 아이템 판매 등록
  http.post('*/api/trades', async ({ request }) => {
    const body = (await request.json()) as { itemDefId: string; price: number };
    
    // 실제로는 userItemId를 사용하지만 백엔드 호환성을 위해 itemDefId를 받음
    const userItemId = parseInt(body.itemDefId);
    const price = body.price;

    // 사용자 아이템에서 찾기
    const userItemIndex = MOCK_USER_ITEMS.findIndex(item => item.userItemId === userItemId);
    if (userItemIndex === -1) {
      return jsonError(404, {
        code: 'E404001',
        message: '아이템을 찾을 수 없습니다.',
        status: 'NOT_FOUND',
      });
    }

    const userItem = MOCK_USER_ITEMS[userItemIndex];
    
    // 경매장에 등록
    const newAuction = {
      auctionId: getNextAuctionId(),
      price: price,
      createdAt: new Date().toISOString(),
      item: {
        userItemId: userItem.userItemId,
        itemDefId: userItem.itemDefId,
        name: userItem.name,
        description: userItem.description,
        picSrc: userItem.picSrc,
        remainingUses: userItem.remainingUses,
        tradeStatus: 'ON_SALE' as const,
        grade: userItem.grade,
        category: userItem.category,
        durability: userItem.durability,
        effectGrades: userItem.effectGrades,
        baseStat: userItem.baseStat,
        strength: userItem.strength,
        agility: userItem.agility,
        intelligence: userItem.intelligence,
        luck: userItem.luck,
      }
    };

    MOCK_AUCTION_ITEMS.push(newAuction);

    // 내 경매 목록에도 추가
    MOCK_MY_AUCTIONS.push({
      auctionId: newAuction.auctionId,
      price: price,
      createdAt: newAuction.createdAt,
      item: {
        itemDefId: userItem.itemDefId,
        name: userItem.name,
        itemGrade: userItem.grade,
        itemType: userItem.itemType,
        mainStat: userItem.mainStat,
        picSrc: userItem.picSrc,
      }
    });

    // 사용자 아이템에서 제거
    MOCK_USER_ITEMS.splice(userItemIndex, 1);

    return jsonResponse(201, { message: '아이템이 성공적으로 등록되었습니다.' });
  }),

  // GET /api/trades/me - 내가 등록한 판매 아이템 조회
  http.get('*/api/trades/me', async ({ request }) => {
    const url = new URL(request.url);
    const params: MyAuctionsRequest = {
      pageIndex: parseInt(url.searchParams.get('pageIndex') || '0'),
      pageSize: parseInt(url.searchParams.get('pageSize') || '10'),
      itemType: url.searchParams.get('itemType') || undefined,
    };

    let filteredItems = [...MOCK_MY_AUCTIONS];
    if (params.itemType) {
      filteredItems = filteredItems.filter(item => item.item.itemType === params.itemType);
    }

    const result = {
      content: filteredItems.slice(params.pageIndex * params.pageSize, (params.pageIndex + 1) * params.pageSize),
      pageInfo: {
        currentPage: params.pageIndex,
        pageSize: params.pageSize,
      },
    };

    return jsonResponse<MyAuctionsResponse>(200, result);
  }),

  // DELETE /api/trades/:id - 판매 취소
  http.delete('*/api/trades/:auctionId', async ({ params }) => {
    const auctionId = parseInt(params.auctionId as string);
    
    // 경매장에서 찾기
    const auctionIndex = MOCK_AUCTION_ITEMS.findIndex(item => item.auctionId === auctionId);
    if (auctionIndex === -1) {
      return jsonError(404, {
        code: 'E404002',
        message: '경매를 찾을 수 없습니다.',
        status: 'NOT_FOUND',
      });
    }

    const auction = MOCK_AUCTION_ITEMS[auctionIndex];
    
    // 사용자 아이템으로 복구
    const restoredItem: UserGameItem = {
      userItemId: auction.item.userItemId,
      itemDefId: auction.item.itemDefId,
      name: auction.item.name,
      description: auction.item.description,
      picSrc: auction.item.picSrc,
      remainingUses: auction.item.remainingUses,
      grade: auction.item.grade,
      category: auction.item.category,
      durability: auction.item.durability,
      effectGrades: auction.item.effectGrades,
      baseStat: auction.item.baseStat,
      strength: auction.item.strength,
      agility: auction.item.agility,
      intelligence: auction.item.intelligence,
      luck: auction.item.luck,
      itemType: auction.item.category === 'WEAPON' ? 'WEAPON' : 
                auction.item.category === 'ARMOR' ? 'ARMOR' : 'CONSUMABLE',
      mainStat: auction.item.strength > auction.item.agility ? 'strength' : 'agility',
    };

    MOCK_USER_ITEMS.push(restoredItem);

    // 경매장에서 제거
    MOCK_AUCTION_ITEMS.splice(auctionIndex, 1);

    // 내 경매 목록에서도 제거
    const myAuctionIndex = MOCK_MY_AUCTIONS.findIndex(item => item.auctionId === auctionId);
    if (myAuctionIndex !== -1) {
      MOCK_MY_AUCTIONS.splice(myAuctionIndex, 1);
    }

    return jsonResponse(200, { message: '경매가 성공적으로 취소되었습니다.' });
  }),

  // POST /api/trades/:id/purchase - 아이템 구매
  http.post('*/api/trades/:auctionId/purchase', async ({ params }) => {
    const auctionId = parseInt(params.auctionId as string);
    
    const auctionIndex = MOCK_AUCTION_ITEMS.findIndex(item => item.auctionId === auctionId);
    if (auctionIndex === -1) {
      return jsonError(404, {
        code: 'E404002',
        message: '경매를 찾을 수 없습니다.',
        status: 'NOT_FOUND',
      });
    }

    const auction = MOCK_AUCTION_ITEMS[auctionIndex];
    
    // 피아가 충분한지 확인
    if (MOCK_USER_CURRENCY.pia < auction.price) {
      return jsonError(400, {
        code: 'E400001',
        message: '피아가 부족합니다.',
        status: 'BAD_REQUEST',
      });
    }

    // 피아 차감
    MOCK_USER_CURRENCY.pia -= auction.price;

    // 아이템을 구매자 인벤토리에 추가
    const purchasedItem: UserGameItem = {
      userItemId: auction.item.userItemId,
      itemDefId: auction.item.itemDefId,
      name: auction.item.name,
      description: auction.item.description,
      picSrc: auction.item.picSrc,
      remainingUses: auction.item.remainingUses,
      grade: auction.item.grade,
      category: auction.item.category,
      durability: auction.item.durability,
      effectGrades: auction.item.effectGrades,
      baseStat: auction.item.baseStat,
      strength: auction.item.strength,
      agility: auction.item.agility,
      intelligence: auction.item.intelligence,
      luck: auction.item.luck,
      itemType: auction.item.category === 'WEAPON' ? 'WEAPON' : 
                auction.item.category === 'ARMOR' ? 'ARMOR' : 'CONSUMABLE',
      mainStat: auction.item.strength > auction.item.agility ? 'strength' : 'agility',
    };

    MOCK_USER_ITEMS.push(purchasedItem);

    // 거래 기록에 추가
    MOCK_TRADE_HISTORY.push({
      auctionId: auction.auctionId,
      price: auction.price,
      tradeAt: new Date().toISOString(),
      item: auction.item,
      tradeStatus: 'PURCHASED',
      settlementId: Math.floor(Math.random() * 10000),
    });

    // 경매장에서 제거
    MOCK_AUCTION_ITEMS.splice(auctionIndex, 1);

    return jsonResponse(200, { message: '아이템을 성공적으로 구매했습니다.' });
  }),

  // GET /api/trades/me/history - 거래 기록 조회
  http.get('*/api/trades/me/history', async ({ request }) => {
    const url = new URL(request.url);
    const params: TradeHistoryRequest = {
      pageIndex: parseInt(url.searchParams.get('pageIndex') || '0'),
      pageSize: parseInt(url.searchParams.get('pageSize') || '10'),
    };

    const result = paginate(MOCK_TRADE_HISTORY, params.pageIndex, params.pageSize);
    
    return jsonResponse<TradeHistoryResponse>(200, result);
  }),

  // POST /api/trades/:transactionId/confirm - 거래 대금 수령
  http.post('*/api/trades/:transactionId/confirm', async ({ params }) => {
    const transactionId = parseInt(params.transactionId as string);
    
    // 거래 기록에서 찾기
    const trade = MOCK_TRADE_HISTORY.find(item => item.transactionId === transactionId);
    if (!trade) {
      return jsonError(404, {
        code: 'E404003',
        message: '거래 내역을 찾을 수 없습니다.',
        status: 'NOT_FOUND',
      });
    }

    // 이미 수령했는지 확인
    if (trade.status === 'COMPLETED') {
      return jsonError(400, {
        code: 'E400002',
        message: '이미 처리된 거래입니다.',
        status: 'BAD_REQUEST',
      });
    }

    // 거래 유형에 따라 처리
    if (trade.type === 'SELL') {
      // 판매인 경우 피아 지급
      MOCK_USER_CURRENCY.pia += trade.price;
    }
    // 구매인 경우에는 이미 아이템을 받았으므로 추가 처리 없음

    // 상태 업데이트
    trade.status = 'COMPLETED';

    const message = trade.type === 'SELL' ? '판매 대금을 성공적으로 수령했습니다.' : '구매를 완료했습니다.';
    return jsonResponse(200, { message });
  }),

  // GET /api/users/me/inventory - 사용자 인벤토리 조회 (프로필용)
  http.get('*/api/users/me/inventory', async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    
    let filteredItems = [...MOCK_USER_ITEMS];
    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    return jsonResponse(200, {
      items: filteredItems,
      totalCount: filteredItems.length,
    });
  }),

  // GET /api/users/me/assets - 사용자 재화 조회 (피아)
  http.get('*/api/users/me/assets', async () => {
    return jsonResponse(200, {
      pia: MOCK_USER_CURRENCY.pia,
    });
  }),
];