export type StatType = 'STRENGTH' | 'INTELLIGENCE' | 'AGILITY' | 'LUCK';
export type SceneType = 'CHOICE' | 'BATTLE' | 's' | 'DONE';

export interface PlayerInfo {
  name: string;
  life: number;
  level: number;
  healthPoint: number;
  experiencePoint: number;
  trait: string;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  gold: number;
}

export interface InventoryItem {
  id?: string | null;
  itemDefId: string;
  acquiredAt: string;
  equipped?: boolean;
  source?: string;
  name?: string;
  description?: string;
  itemPicSrc?: string;
  category?: string;
  baseStat?: number;
  itemEffects?: Array<{
    itemEffectName: string;
    itemEffectDescription: string;
    grade: string;
  }>;
  strength?: number;
  agility?: number;
  intelligence?: number;
  luck?: number;
  mainStat?: string;
  grade?: string;
  price?: number;
  // 실제 API 응답에 있을 수 있는 추가 필드들
  remainingUses?: number;
  picSrc?: string; // itemPicSrc 대신 사용될 수 있음
}

export interface NpcInfo {
  name: string;
  rank: number;
  trait: string;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  npcWeaponName: string;
  npcWeaponDescription: string;
}

export interface ChoiceInfo {
  detail: string;
  stats: string;
  probability: number;
}

// 실제 API 응답에 맞는 선택지 타입
export interface StoryChoice {
  id: string;
  detail: string;
  stats: string;
  probability: number;
  label: string;
  successRate: number;
}

// 스토리 컨텐츠 타입
export interface StoryContent {
  title: string;
  body: string;
  imageUrl?: string;
  progress: number;
}

export interface ShopItem {
  shopItemId: string;
  name: string;
  description: string;
  itemPicSrc: string;
  category: string;
  baseStat: number;
  itemEffects?: Array<{
    itemEffectName: string;
    itemEffectDescription: string;
    grade: string;
  }>;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  mainStat: string;
  grade: string;
  price: number;
}

export interface BattleInfo {
  curTurnId: number;
  playerHp: number[];
  enemyHp: number[];
  battleTurn: Array<{ turnInfo: string }>;
  playerWin?: boolean;
}

export interface GameSessionData {
  sceneType: SceneType;
  startedAt: string;
  updatedAt: string;
  background: string;
  location: string;
  progress: number;
  stageSize: number;
  playerInfo: PlayerInfo;
  npcInfo?: NpcInfo;
  inventory: InventoryItem[];
  choiceInfo?: ChoiceInfo[];
  shopTable?: ShopItem[];
  // 기존 필드들 (하위 호환성)
  curTurnId?: number;
  playerHp?: number[];
  enemyHp?: number[];
  battleStory?: Array<{ turnInfo: string }>;
  playerWin?: boolean;
  // 새로운 battleInfo 구조 (select API response 형태)
  battleInfo?: BattleInfo;
  rewardInfo?: {
    gainedItemNames?: string[];
    rewardStrength?: number;
    rewardAgility?: number;
    rewardIntelligence?: number;
    rewardLuck?: number;
    rewardLife?: number;
    rewardGold?: number;
  };
}

export interface StoryLog {
  id: string;
  type: 'ACTION' | 'SYSTEM' | 'RESULT';
  text: string;
  createdAt: string;
}

// 기존 모킹용 GameSession 인터페이스 (MSW 호환성 유지)
export interface GameSession {
  player: {
    sessionId: string;
    name: string;
    level: number;
    job: string;
    hp: { current: number; max: number };
    exp: { current: number; max: number };
    stats: Array<{ type: StatType; value: number }>;
    inventory: Array<{ slotId: string; name: string; icon: string; equipped: boolean }>;
    gold: number;
  };
  story: StoryContent;
  choices: StoryChoice[];
  logs: StoryLog[];
  isCompleted: boolean;
}

// 실제 API 응답용 인터페이스
export interface ApiGameSession {
  sessionData: GameSessionData;
  logs: StoryLog[];
}

export interface CreateSessionResponse {
  sessionId: string;
}

export interface ChoiceRequest {
  choiceId: string;
}

export interface PromptRequest {
  prompt: string;
}
