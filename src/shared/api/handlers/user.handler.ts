import { http, HttpResponse } from 'msw';

export const userHandlers = [
  // 사용자 인벤토리 조회
  http.post('http://localhost:3000/users/me/items/game', async ({ request }) => {
    const body = await request.json() as { category: number };
    
    // 더미 인벤토리 데이터
    const mockInventory = [
      {
        name: "철 검",
        description: "견고한 철로 제작된 기본적인 검. 균형 잡힌 공격력과 내구성을 자랑한다.",
        picSrc: "/assets/철 검.png",
        itemType: "WEAPON",
        baseStat: 25,
        strength: 2,
        agility: 1,
        intelligence: 0,
        luck: 0,
        mainStat: "STRENGTH",
        grade: "COMMON",
        itemEffect: [
          {
            effectProbability: "COMMON",
            effectName: "날카로운 일격",
            description: "기본 공격력이 향상된다."
          }
        ],
        remainingUses: null,
        price: 80
      },
      {
        name: "철 도끼",
        description: "무거운 철 도끼. 강력한 일격을 날릴 수 있지만 속도가 느리다.",
        picSrc: "/assets/철 도끼.png",
        itemType: "WEAPON",
        baseStat: 35,
        strength: 3,
        agility: -1,
        intelligence: 0,
        luck: 0,
        mainStat: "STRENGTH",
        grade: "UNCOMMON",
        itemEffect: [
          {
            effectProbability: "UNCOMMON",
            effectName: "강력한 타격",
            description: "치명타 피해량이 증가한다."
          }
        ],
        remainingUses: null,
        price: 120
      },
      {
        name: "무형의 지팡이",
        description: "마법의 힘이 깃든 신비로운 지팡이. 지능을 크게 향상시킨다.",
        picSrc: "/assets/무형의 지팡이.png",
        itemType: "WEAPON",
        baseStat: 20,
        strength: 0,
        agility: 0,
        intelligence: 4,
        luck: 1,
        mainStat: "INTELLIGENCE",
        grade: "RARE",
        itemEffect: [
          {
            effectProbability: "RARE",
            effectName: "마나 집중",
            description: "마법 공격력이 크게 증가한다."
          }
        ],
        remainingUses: null,
        price: 200
      },
      {
        name: "강철 갑옷",
        description: "견고한 강철로 제작된 갑옷. 뛰어난 방어력을 제공한다.",
        picSrc: "/assets/강철 갑옷.png",
        itemType: "ARMOR",
        baseStat: 45,
        strength: 1,
        agility: -1,
        intelligence: 0,
        luck: 0,
        mainStat: "DEFENSE",
        grade: "UNCOMMON",
        itemEffect: [
          {
            effectProbability: "COMMON",
            effectName: "견고한 방어",
            description: "받는 물리 피해가 감소한다."
          }
        ],
        remainingUses: null,
        price: 150
      },
      {
        name: "화염의 궤",
        description: "고대의 화염 마법이 봉인된 신비한 상자. 강력한 화염 주문을 담고 있다.",
        picSrc: "/assets/화염의 궤.png",
        itemType: "CONSUMABLE",
        baseStat: 0,
        strength: 0,
        agility: 0,
        intelligence: 2,
        luck: 1,
        mainStat: "NONE",
        grade: "EPIC",
        itemEffect: [
          {
            effectProbability: "EPIC",
            effectName: "화염 폭발",
            description: "적에게 강력한 화염 피해를 입힌다."
          }
        ],
        remainingUses: 1,
        price: 300
      }
    ];

    return HttpResponse.json(mockInventory);
  }),

  // 게임 히스토리 조회
  http.get('http://localhost:3000/users/me/games/histories', ({ request }) => {
    const url = new URL(request.url);
    const size = parseInt(url.searchParams.get('size') || '10');
    const lastId = url.searchParams.get('lastId');

    // 더미 게임 히스토리 데이터
    const mockHistories = [
      {
        historyUUID: "550e8400-e29b-41d4-a716-446655440001",
        thumbnailUrl: "/assets/나 엄태준, 교수를 이겼더니 내가 교수가 됨.png",
        title: "나 엄상구, 교수를 이겼더니 내가 교수가 됨",
        worldView: "대학교를 배경으로 한 현실적이면서도 판타지적인 세계",
        backgroundStory: "평범한 대학생 엄상구가 우연한 기회로 교수와의 대결에서 승리하게 되면서 벌어지는 좌충우돌 교수 생활 이야기.",
        epilogue1Title: "예상치 못한 승리",
        epilogue1Content: "그저 평범한 학생이었던 엄상구가 교수를 이기게 된 순간, 모든 것이 바뀌었다.",
        epilogue2Title: "교수가 된 학생",
        epilogue2Content: "갑작스럽게 교수가 된 엄상구는 학생들을 가르치며 새로운 도전에 직면한다.",
        epilogue3Title: "새로운 교육의 시작",
        epilogue3Content: "젊은 교수 엄상구는 자신만의 독특한 교육 방식으로 학생들과 함께 성장해나간다.",
        score: 850,
        createdAt: "2024-10-05T14:30:00Z",
        isShared: true
      },
      {
        historyUUID: "550e8400-e29b-41d4-a716-446655440002",
        thumbnailUrl: "/assets/레비아탄과 맞짱뜨기.png",
        title: "레비아탄과 맞짱뜨기",
        worldView: "거대한 바다 괴물과 인간이 공존하는 판타지 해양 세계",
        backgroundStory: "전설의 바다 괴물 레비아탄이 깨어나자, 용감한 선원이 이에 맞서기 위해 바다로 나선다.",
        epilogue1Title: "바다의 전설",
        epilogue1Content: "깊은 바다에서 만난 레비아탄은 생각했던 것보다 훨씬 거대하고 강력했다.",
        epilogue2Title: "용기와 지혜의 대결",
        epilogue2Content: "힘만으로는 이길 수 없는 상대, 지혜와 용기를 결합한 전략이 필요했다.",
        epilogue3Title: "바다의 새로운 질서",
        epilogue3Content: "레비아탄과의 대결을 통해 바다에는 새로운 평화가 찾아왔다.",
        score: 720,
        createdAt: "2024-10-04T10:15:00Z",
        isShared: false
      },
      {
        historyUUID: "550e8400-e29b-41d4-a716-446655440003",
        thumbnailUrl: "/assets/기원전 5세기 아테네와 야차.png",
        title: "기원전 5세기 아테네와 야차",
        worldView: "고대 그리스 아테네에 동양의 신화 생물이 나타난 신비로운 세계",
        backgroundStory: "기원전 5세기 아테네, 갑작스럽게 나타난 동양의 야차와 그리스 철학자들의 만남을 그린 이야기.",
        epilogue1Title: "동서양의 만남",
        epilogue1Content: "아테네의 철학자들이 처음 만난 동양의 야차, 서로 다른 문명의 충돌이 시작되었다.",
        epilogue2Title: "지혜의 교환",
        epilogue2Content: "야차의 초자연적 힘과 그리스의 철학이 만나 새로운 깨달음이 생겨났다.",
        epilogue3Title: "문명의 융합",
        epilogue3Content: "동서양의 지혜가 하나로 합쳐져 새로운 문명의 씨앗이 뿌려졌다.",
        score: 690,
        createdAt: "2024-10-03T16:45:00Z",
        isShared: true
      },
      {
        historyUUID: "550e8400-e29b-41d4-a716-446655440004",
        thumbnailUrl: "/assets/죽음의 방에서 탈출하기.png",
        title: "죽음의 방에서 탈출하기",
        worldView: "미스터리와 공포가 가득한 밀실 탈출 세계",
        backgroundStory: "갑작스럽게 정신을 차리니 알 수 없는 방 안에 갇혀있다. 이곳에서 벗어나기 위해서는 수많은 수수께끼를 풀어야 한다.",
        epilogue1Title: "깨어난 순간",
        epilogue1Content: "어둠 속에서 눈을 뜨니, 낯선 방 안에 혼자 갇혀있었다.",
        epilogue2Title: "퍼즐의 연속",
        epilogue2Content: "방 곳곳에 숨겨진 단서들을 하나씩 찾아가며 탈출의 실마리를 찾았다.",
        epilogue3Title: "자유를 향해",
        epilogue3Content: "마지막 문이 열리며, 긴 악몽같은 시간이 끝나고 자유를 되찾았다.",
        score: 780,
        createdAt: "2024-10-02T08:20:00Z",
        isShared: false
      }
    ];

    // 페이지네이션 시뮬레이션
    let filteredHistories = mockHistories;
    if (lastId) {
      const lastIndex = mockHistories.findIndex(h => h.historyUUID === lastId);
      if (lastIndex !== -1) {
        filteredHistories = mockHistories.slice(lastIndex + 1);
      }
    }

    const paginatedHistories = filteredHistories.slice(0, size);
    const hasNext = filteredHistories.length > size;
    const nextCursor = hasNext ? paginatedHistories[paginatedHistories.length - 1]?.historyUUID : null;

    return HttpResponse.json({
      data: paginatedHistories,
      nextCursor,
      hasNext
    });
  })
];