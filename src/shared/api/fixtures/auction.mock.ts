import type { AuctionListing, MyAuction, TradeHistory, AuctionItem } from '@/entities/auction/model/types';

// 사용자 보유 아이템 (판매 가능한 아이템들)
export interface UserGameItem {
  userItemId: number;
  itemDefId: number;
  name: string;
  description: string;
  picSrc: string;
  remainingUses: number;
  grade: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  category: string;
  durability?: number;
  effectGrades?: string[];
  baseStat: number;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  itemType: 'WEAPON' | 'ARMOR' | 'CONSUMABLE';
  mainStat: string;
}

// 경매장에 등록된 아이템들
export const MOCK_AUCTION_ITEMS: AuctionListing[] = [
  {
    auctionId: 1,
    price: 15000,
    createdAt: '2025-01-06T10:30:00.000Z',
    item: {
      userItemId: 101,
      itemDefId: 1001,
      name: '철 검',
      description: '튼튼한 철로 제작된 검. 기본적이지만 믿을만한 무기다.',
      picSrc: '/assets/철 검.png',
      remainingUses: 100,
      tradeStatus: 'ON_SALE',
      grade: 'COMMON',
      category: 'WEAPON',
      durability: 95,
      baseStat: 150,
      strength: 30,
      agility: 0,
      intelligence: 0,
      luck: 0
    }
  },
  {
    auctionId: 2,
    price: 8000,
    createdAt: '2025-01-06T09:15:00.000Z',
    item: {
      userItemId: 102,
      itemDefId: 1002,
      name: '강철 갑옷',
      description: '가벼우면서도 단단한 강철로 제작된 갑옷.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 80,
      tradeStatus: 'ON_SALE',
      grade: 'UNCOMMON',
      category: 'ARMOR',
      durability: 90,
      baseStat: 120,
      strength: 0,
      agility: 25,
      intelligence: 0,
      luck: 0
    }
  },
  {
    auctionId: 3,
    price: 25000,
    createdAt: '2025-01-06T11:45:00.000Z',
    item: {
      userItemId: 103,
      itemDefId: 1003,
      name: '무형의 지팡이',
      description: '신비한 마법의 힘이 깃든 고대의 지팡이.',
      picSrc: '/assets/무형의 지팡이.png',
      remainingUses: 50,
      tradeStatus: 'ON_SALE',
      grade: 'LEGENDARY',
      category: 'WEAPON',
      baseStat: 280,
      strength: 0,
      agility: 0,
      intelligence: 65,
      luck: 0
    }
  },
  {
    auctionId: 4,
    price: 18000,
    createdAt: '2025-01-06T08:20:00.000Z',
    item: {
      userItemId: 104,
      itemDefId: 1004,
      name: '화염의 궤',
      description: '불꽃의 정령이 깃든 신비한 상자. 강력한 화염 마법을 품고 있다.',
      picSrc: '/assets/화염의 궤.png',
      remainingUses: 3,
      tradeStatus: 'ON_SALE',
      grade: 'EPIC',
      category: 'CONSUMABLE',
      baseStat: 0,
      strength: 0,
      agility: 0,
      intelligence: 45,
      luck: 0
    }
  },
  {
    auctionId: 5,
    price: 12000,
    createdAt: '2025-01-06T07:30:00.000Z',
    item: {
      userItemId: 105,
      itemDefId: 1005,
      name: '철 도끼',
      description: '날카롭게 벼려진 철 도끼. 나무뿐만 아니라 적도 베어낸다.',
      picSrc: '/assets/철 도끼.png',
      remainingUses: 85,
      tradeStatus: 'ON_SALE',
      grade: 'COMMON',
      category: 'WEAPON',
      durability: 88,
      baseStat: 140,
      strength: 35,
      agility: 0,
      intelligence: 0,
      luck: 0
    }
  },
  {
    auctionId: 6,
    price: 5000,
    createdAt: '2025-01-06T13:10:00.000Z',
    item: {
      userItemId: 106,
      itemDefId: 1006,
      name: '드래곤 슬레이어 검',
      description: '전설의 용을 물리친다는 검. 붉은 빛이 검신을 감싼다.',
      picSrc: '/assets/철 검.png',
      remainingUses: 120,
      tradeStatus: 'ON_SALE',
      grade: 'RARE',
      category: 'WEAPON',
      durability: 95,
      baseStat: 200,
      strength: 45,
      agility: 25,
      intelligence: 10,
      luck: 20
    }
  },
  {
    auctionId: 7,
    price: 22000,
    createdAt: '2025-01-06T12:30:00.000Z',
    item: {
      userItemId: 107,
      itemDefId: 1007,
      name: '마스터 강철 갑옷',
      description: '최고 수준의 대장장이가 제작한 강철 갑옷. 마법 저항력이 뛰어나다.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 95,
      tradeStatus: 'ON_SALE',
      grade: 'EPIC',
      category: 'ARMOR',
      durability: 98,
      baseStat: 240,
      strength: 35,
      agility: 20,
      intelligence: 15,
      luck: 18
    }
  },
  {
    auctionId: 8,
    price: 35000,
    createdAt: '2025-01-06T14:45:00.000Z',
    item: {
      userItemId: 108,
      itemDefId: 1008,
      name: '대마법사의 지팡이',
      description: '고대 대마법사가 사용했던 전설의 지팡이. 무한한 마나를 품고 있다.',
      picSrc: '/assets/무형의 지팡이.png',
      remainingUses: 200,
      tradeStatus: 'ON_SALE',
      grade: 'LEGENDARY',
      category: 'WEAPON',
      durability: 100,
      baseStat: 350,
      strength: 5,
      agility: 15,
      intelligence: 80,
      luck: 40
    }
  },
  {
    auctionId: 9,
    price: 8500,
    createdAt: '2025-01-06T16:20:00.000Z',
    item: {
      userItemId: 109,
      itemDefId: 1009,
      name: '정령의 화염궤',
      description: '화염 정령의 힘이 봉인된 마법 상자. 강력한 화염 마법을 발휘한다.',
      picSrc: '/assets/화염의 궤.png',
      remainingUses: 5,
      tradeStatus: 'ON_SALE',
      grade: 'RARE',
      category: 'CONSUMABLE',
      baseStat: 0,
      strength: 0,
      agility: 0,
      intelligence: 35,
      luck: 15
    }
  },
  {
    auctionId: 10,
    price: 14000,
    createdAt: '2025-01-06T15:10:00.000Z',
    item: {
      userItemId: 110,
      itemDefId: 1010,
      name: '바이킹 전투 도끼',
      description: '북방의 바이킹 전사들이 사용하던 거대한 전투 도끼.',
      picSrc: '/assets/철 도끼.png',
      remainingUses: 110,
      tradeStatus: 'ON_SALE',
      grade: 'UNCOMMON',
      category: 'WEAPON',
      durability: 85,
      baseStat: 180,
      strength: 50,
      agility: 8,
      intelligence: 0,
      luck: 12
    }
  },
  {
    auctionId: 11,
    price: 28000,
    createdAt: '2025-01-06T17:30:00.000Z',
    item: {
      userItemId: 111,
      itemDefId: 1011,
      name: '아케인 갑주',
      description: '마법사들을 위해 특별히 제작된 마법 저항 갑주.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 75,
      tradeStatus: 'ON_SALE',
      grade: 'EPIC',
      category: 'ARMOR',
      durability: 92,
      baseStat: 220,
      strength: 20,
      agility: 25,
      intelligence: 40,
      luck: 25
    }
  },
  {
    auctionId: 12,
    price: 45000,
    createdAt: '2025-01-06T18:15:00.000Z',
    item: {
      userItemId: 112,
      itemDefId: 1012,
      name: '세상을 가르는 검',
      description: '신들조차 두려워한다는 전설의 검. 현실을 베어낼 수 있다.',
      picSrc: '/assets/철 검.png',
      remainingUses: 300,
      tradeStatus: 'ON_SALE',
      grade: 'LEGENDARY',
      category: 'WEAPON',
      durability: 100,
      baseStat: 400,
      strength: 70,
      agility: 50,
      intelligence: 20,
      luck: 35
    }
  }
];

// 사용자가 보유한 아이템들 (판매 가능)
export const MOCK_USER_ITEMS: UserGameItem[] = [
  {
    userItemId: 201,
    itemDefId: 2001,
    name: '철 검',
    description: '단단한 철로 만든 검. 기본적이지만 신뢰할 수 있다.',
    picSrc: '/assets/철 검.png',
    remainingUses: 90,
    grade: 'COMMON',
    category: 'WEAPON',
    durability: 80,
    baseStat: 100,
    strength: 20,
    agility: 5,
    intelligence: 0,
    luck: 5,
    itemType: 'WEAPON',
    mainStat: 'strength'
  },
  {
    userItemId: 202,
    itemDefId: 2002,
    name: '강철 갑옷',
    description: '부드럽고 유연한 강철으로 만든 갑옷.',
    picSrc: '/assets/강철 갑옷.png',
    remainingUses: 75,
    grade: 'UNCOMMON',
    category: 'ARMOR',
    durability: 70,
    baseStat: 110,
    strength: 15,
    agility: 20,
    intelligence: 0,
    luck: 8,
    itemType: 'ARMOR',
    mainStat: 'agility'
  },
  {
    userItemId: 203,
    itemDefId: 2003,
    name: '화염의 궤',
    description: '강력한 화염 마법을 품은 신비한 상자.',
    picSrc: '/assets/화염의 궤.png',
    remainingUses: 2,
    grade: 'RARE',
    category: 'CONSUMABLE',
    baseStat: 0,
    strength: 0,
    agility: 0,
    intelligence: 30,
    luck: 10,
    itemType: 'CONSUMABLE',
    mainStat: 'intelligence'
  },
  {
    userItemId: 204,
    itemDefId: 2004,
    name: '철 도끼',
    description: '철로 제작된 날카로운 도끼. 나무와 적을 가리지 않고 베어낸다.',
    picSrc: '/assets/철 도끼.png',
    remainingUses: 60,
    grade: 'COMMON',
    category: 'WEAPON',
    durability: 65,
    baseStat: 120,
    strength: 30,
    agility: 8,
    intelligence: 0,
    luck: 7,
    itemType: 'WEAPON',
    mainStat: 'strength'
  },
  {
    userItemId: 205,
    itemDefId: 2005,
    name: '무형의 지팡이',
    description: '순수한 마나가 응축된 고대의 지팡이. 마법사들이 선호한다.',
    picSrc: '/assets/무형의 지팡이.png',
    remainingUses: 30,
    grade: 'EPIC',
    category: 'WEAPON',
    baseStat: 200,
    strength: 0,
    agility: 10,
    intelligence: 50,
    luck: 15,
    itemType: 'WEAPON',
    mainStat: 'intelligence'
  },
  {
    userItemId: 206,
    itemDefId: 2006,
    name: '전설의 철 검',
    description: '고대 영웅이 사용했던 철 검. 특별한 힘이 깃들어 있다.',
    picSrc: '/assets/철 검.png',
    remainingUses: 150,
    grade: 'LEGENDARY',
    category: 'WEAPON',
    durability: 95,
    baseStat: 250,
    strength: 55,
    agility: 25,
    intelligence: 5,
    luck: 20,
    itemType: 'WEAPON',
    mainStat: 'strength'
  },
  {
    userItemId: 207,
    itemDefId: 2007,
    name: '드래곤 갑주',
    description: '용의 비늘로 만든 전설적인 갑옷. 화염에 완전 면역이다.',
    picSrc: '/assets/강철 갑옷.png',
    remainingUses: 200,
    grade: 'LEGENDARY',
    category: 'ARMOR',
    durability: 100,
    baseStat: 300,
    strength: 40,
    agility: 30,
    intelligence: 10,
    luck: 25,
    itemType: 'ARMOR',
    mainStat: 'strength'
  },
  {
    userItemId: 208,
    itemDefId: 2008,
    name: '대마법사의 지팡이',
    description: '전설적인 대마법사가 사용한 지팡이. 무한한 마력을 품고 있다.',
    picSrc: '/assets/무형의 지팡이.png',
    remainingUses: 500,
    grade: 'LEGENDARY',
    category: 'WEAPON',
    durability: 100,
    baseStat: 400,
    strength: 5,
    agility: 20,
    intelligence: 85,
    luck: 40,
    itemType: 'WEAPON',
    mainStat: 'intelligence'
  },
  {
    userItemId: 209,
    itemDefId: 2009,
    name: '전투용 철 도끼',
    description: '전장에서 사용되는 강화된 철 도끼. 적을 일격에 베어낸다.',
    picSrc: '/assets/철 도끼.png',
    remainingUses: 80,
    grade: 'UNCOMMON',
    category: 'WEAPON',
    durability: 75,
    baseStat: 140,
    strength: 35,
    agility: 10,
    intelligence: 0,
    luck: 12,
    itemType: 'WEAPON',
    mainStat: 'strength'
  },
  {
    userItemId: 210,
    itemDefId: 2010,
    name: '신비한 화염궤',
    description: '고대 마법사가 만든 화염의 궤. 강력한 화염 마법을 발휘한다.',
    picSrc: '/assets/화염의 궤.png',
    remainingUses: 5,
    grade: 'EPIC',
    category: 'CONSUMABLE',
    baseStat: 0,
    strength: 0,
    agility: 0,
    intelligence: 40,
    luck: 20,
    itemType: 'CONSUMABLE',
    mainStat: 'intelligence'
  },
  {
    userItemId: 211,
    itemDefId: 2011,
    name: '기사단장의 갑옷',
    description: '왕국 기사단장이 착용했던 명예로운 갑옷.',
    picSrc: '/assets/강철 갑옷.png',
    remainingUses: 120,
    grade: 'EPIC',
    category: 'ARMOR',
    durability: 90,
    baseStat: 180,
    strength: 25,
    agility: 20,
    intelligence: 5,
    luck: 15,
    itemType: 'ARMOR',
    mainStat: 'strength'
  },
  {
    userItemId: 212,
    itemDefId: 2012,
    name: '원시 지팡이',
    description: '태고의 마법이 깃든 원시 시대의 지팡이.',
    picSrc: '/assets/무형의 지팡이.png',
    remainingUses: 45,
    grade: 'RARE',
    category: 'WEAPON',
    durability: 85,
    baseStat: 160,
    strength: 5,
    agility: 15,
    intelligence: 35,
    luck: 18,
    itemType: 'WEAPON',
    mainStat: 'intelligence'
  }
];

// 내가 등록한 판매 아이템들
export const MOCK_MY_AUCTIONS: MyAuction[] = [
  {
    auctionId: 501,
    price: 7500,
    createdAt: '2025-01-05T14:20:00.000Z',
    item: {
      userItemId: 301,
      itemDefId: 3001,
      name: '마스터 철 검',
      description: '숙련된 대장장이가 제작한 고품질 철 검.',
      picSrc: '/assets/철 검.png',
      remainingUses: 95,
      tradeStatus: 'ON_SALE',
      grade: 'RARE',
      category: 'WEAPON',
      durability: 90,
      baseStat: 180,
      strength: 40,
      agility: 15,
      intelligence: 5,
      luck: 12
    },
    status: 'ON_SALE'
  },
  {
    auctionId: 502,
    price: 12000,
    createdAt: '2025-01-05T16:45:00.000Z',
    item: {
      userItemId: 302,
      itemDefId: 3002,
      name: '왕실 강철 갑옷',
      description: '왕실 기사단이 착용하는 최고급 강철 갑옷.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 85,
      tradeStatus: 'ON_SALE',
      grade: 'EPIC',
      category: 'ARMOR',
      durability: 95,
      baseStat: 220,
      strength: 30,
      agility: 25,
      intelligence: 10,
      luck: 18
    },
    status: 'ON_SALE'
  },
  {
    auctionId: 503,
    price: 3200,
    createdAt: '2025-01-06T09:30:00.000Z',
    item: {
      userItemId: 303,
      itemDefId: 3003,
      name: '용사의 화염궤',
      description: '용사가 사용했던 특별한 화염 마법의 궤.',
      picSrc: '/assets/화염의 궤.png',
      remainingUses: 3,
      tradeStatus: 'ON_SALE',
      grade: 'RARE',
      category: 'CONSUMABLE',
      baseStat: 0,
      strength: 0,
      agility: 0,
      intelligence: 35,
      luck: 15
    },
    status: 'ON_SALE'
  },
  {
    auctionId: 504,
    price: 18000,
    createdAt: '2025-01-04T11:15:00.000Z',
    item: {
      userItemId: 304,
      itemDefId: 3004,
      name: '고대 지팡이',
      description: '고대 마법사들이 사용했던 신비로운 지팡이.',
      picSrc: '/assets/무형의 지팡이.png',
      remainingUses: 120,
      tradeStatus: 'SOLD',
      grade: 'EPIC',
      category: 'WEAPON',
      durability: 88,
      baseStat: 250,
      strength: 8,
      agility: 20,
      intelligence: 60,
      luck: 25
    },
    status: 'SOLD'
  },
  {
    auctionId: 505,
    price: 6800,
    createdAt: '2025-01-04T13:40:00.000Z',
    item: {
      userItemId: 305,
      itemDefId: 3005,
      name: '전투용 철 도끼',
      description: '전장에서 사용되던 강력한 철 도끼.',
      picSrc: '/assets/철 도끼.png',
      remainingUses: 75,
      tradeStatus: 'SOLD',
      grade: 'UNCOMMON',
      category: 'WEAPON',
      durability: 80,
      baseStat: 150,
      strength: 38,
      agility: 10,
      intelligence: 0,
      luck: 8
    },
    status: 'SOLD'
  },
  {
    auctionId: 506,
    price: 4500,
    createdAt: '2025-01-06T08:00:00.000Z',
    item: {
      userItemId: 306,
      itemDefId: 3006,
      name: '기사 갑옷',
      description: '일반 기사들이 착용하는 표준 강철 갑옷.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 90,
      tradeStatus: 'CANCELLED',
      grade: 'COMMON',
      category: 'ARMOR',
      durability: 85,
      baseStat: 120,
      strength: 20,
      agility: 18,
      intelligence: 0,
      luck: 10
    },
    status: 'CANCELLED'
  }
];

// 거래 기록
export const MOCK_TRADE_HISTORY: TradeHistory[] = [
  // 구매 기록
  {
    transactionId: 1001,
    type: 'BUY',
    price: 15000,
    timestamp: '2025-01-04T10:30:00.000Z',
    status: 'PROCESSING',
    tradeDate: '2025-01-04',
    item: {
      userItemId: 401,
      itemDefId: 4001,
      name: '전설의 용검',
      description: '고대 용을 물리친 전설적인 검.',
      picSrc: '/assets/철 검.png',
      remainingUses: 150,
      tradeStatus: 'SOLD_OUT',
      grade: 'LEGENDARY',
      category: 'WEAPON',
      durability: 98,
      baseStat: 300,
      strength: 60,
      agility: 25,
      intelligence: 15,
      luck: 30
    },
    otherParty: '드래곤헌터'
  },
  {
    transactionId: 1002,
    type: 'BUY',
    price: 8500,
    timestamp: '2025-01-03T14:20:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2025-01-03',
    item: {
      userItemId: 402,
      itemDefId: 4002,
      name: '미스릴 갑주',
      description: '가볍고 강한 미스릴로 제작된 갑옷.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 120,
      tradeStatus: 'SOLD_OUT',
      grade: 'EPIC',
      category: 'ARMOR',
      durability: 95,
      baseStat: 200,
      strength: 25,
      agility: 30,
      intelligence: 10,
      luck: 20
    },
    otherParty: '아머마스터'
  },
  {
    transactionId: 1003,
    type: 'BUY',
    price: 12000,
    timestamp: '2025-01-02T16:45:00.000Z',
    status: 'PROCESSING',
    tradeDate: '2025-01-02',
    item: {
      userItemId: 403,
      itemDefId: 4003,
      name: '아르카나 지팡이',
      description: '순수한 마나가 흐르는 고급 지팡이.',
      picSrc: '/assets/무형의 지팡이.png',
      remainingUses: 80,
      tradeStatus: 'SOLD_OUT',
      grade: 'RARE',
      category: 'WEAPON',
      durability: 90,
      baseStat: 180,
      strength: 5,
      agility: 15,
      intelligence: 45,
      luck: 25
    },
    otherParty: '마법사길드'
  },
  {
    transactionId: 1004,
    type: 'BUY',
    price: 3200,
    timestamp: '2025-01-02T09:15:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2025-01-02',
    item: {
      userItemId: 404,
      itemDefId: 4004,
      name: '화염 마법궤',
      description: '강력한 화염 마법이 봉인된 상자.',
      picSrc: '/assets/화염의 궤.png',
      remainingUses: 5,
      tradeStatus: 'SOLD_OUT',
      grade: 'RARE',
      category: 'CONSUMABLE',
      baseStat: 0,
      strength: 0,
      agility: 0,
      intelligence: 40,
      luck: 15
    },
    otherParty: '화염술사'
  },
  // 판매 기록
  {
    transactionId: 1005,
    type: 'SELL',
    price: 18000,
    timestamp: '2025-01-04T11:15:00.000Z',
    status: 'PROCESSING',
    tradeDate: '2025-01-04',
    item: {
      userItemId: 304,
      itemDefId: 3004,
      name: '고대 지팡이',
      description: '고대 마법사들이 사용했던 신비로운 지팡이.',
      picSrc: '/assets/무형의 지팡이.png',
      remainingUses: 120,
      tradeStatus: 'SOLD_OUT',
      grade: 'EPIC',
      category: 'WEAPON',
      durability: 88,
      baseStat: 250,
      strength: 8,
      agility: 20,
      intelligence: 60,
      luck: 25
    },
    otherParty: '마법연구소'
  },
  {
    transactionId: 1006,
    type: 'SELL',
    price: 6800,
    timestamp: '2025-01-04T13:40:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2025-01-04',
    item: {
      userItemId: 305,
      itemDefId: 3005,
      name: '전투용 철 도끼',
      description: '전장에서 사용되던 강력한 철 도끼.',
      picSrc: '/assets/철 도끼.png',
      remainingUses: 75,
      tradeStatus: 'SOLD_OUT',
      grade: 'UNCOMMON',
      category: 'WEAPON',
      durability: 80,
      baseStat: 150,
      strength: 38,
      agility: 10,
      intelligence: 0,
      luck: 8
    },
    otherParty: '전사조합'
  },
  {
    transactionId: 1007,
    type: 'SELL',
    price: 9500,
    timestamp: '2025-01-01T15:20:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2025-01-01',
    item: {
      userItemId: 405,
      itemDefId: 4005,
      name: '강화 철 검',
      description: '마법으로 강화된 철 검.',
      picSrc: '/assets/철 검.png',
      remainingUses: 110,
      tradeStatus: 'SOLD_OUT',
      grade: 'UNCOMMON',
      category: 'WEAPON',
      durability: 85,
      baseStat: 160,
      strength: 35,
      agility: 12,
      intelligence: 3,
      luck: 10
    },
    otherParty: '모험가조합'
  },
  {
    transactionId: 1008,
    type: 'SELL',
    price: 14000,
    timestamp: '2024-12-30T11:30:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2024-12-30',
    item: {
      userItemId: 406,
      itemDefId: 4006,
      name: '왕실 갑주',
      description: '왕실에서 사용되는 최고급 갑옷.',
      picSrc: '/assets/강철 갑옷.png',
      remainingUses: 140,
      tradeStatus: 'SOLD_OUT',
      grade: 'EPIC',
      category: 'ARMOR',
      durability: 98,
      baseStat: 240,
      strength: 35,
      agility: 20,
      intelligence: 8,
      luck: 22
    },
    otherParty: '기사단'
  },
  {
    transactionId: 1009,
    type: 'BUY',
    price: 5500,
    timestamp: '2024-12-29T13:45:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2024-12-29',
    item: {
      userItemId: 407,
      itemDefId: 4007,
      name: '바이킹 도끼',
      description: '북방 전사들이 사용하는 거대한 도끼.',
      picSrc: '/assets/철 도끼.png',
      remainingUses: 95,
      tradeStatus: 'SOLD_OUT',
      grade: 'COMMON',
      category: 'WEAPON',
      durability: 75,
      baseStat: 140,
      strength: 40,
      agility: 5,
      intelligence: 0,
      luck: 8
    },
    otherParty: '바이킹상인'
  },
  {
    transactionId: 1010,
    type: 'BUY',
    price: 7200,
    timestamp: '2024-12-28T10:00:00.000Z',
    status: 'COMPLETED',
    tradeDate: '2024-12-28',
    item: {
      userItemId: 408,
      itemDefId: 4008,
      name: '신비한 화염궤',
      description: '정령의 힘이 깃든 화염 마법궤.',
      picSrc: '/assets/화염의 궤.png',
      remainingUses: 8,
      tradeStatus: 'SOLD_OUT',
      grade: 'EPIC',
      category: 'CONSUMABLE',
      baseStat: 0,
      strength: 0,
      agility: 0,
      intelligence: 50,
      luck: 20
    },
    otherParty: '정령상인'
  }
];

// 사용자별 피아 (통화)
export const MOCK_USER_CURRENCY = {
  pia: 12500
};

// 경매장 필터 옵션들
export const MOCK_CATEGORIES = ['WEAPON', 'ARMOR', 'ACCESSORY', 'CONSUMABLE'];
export const MOCK_GRADES = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];
export const MOCK_MAIN_STATS = ['strength', 'agility', 'intelligence', 'luck'];

// 다음 ID들 (새 아이템 생성 시 사용)
export let nextAuctionId = 13;
export let nextUserItemId = 213;

export const getNextAuctionId = () => nextAuctionId++;
export const getNextUserItemId = () => nextUserItemId++;