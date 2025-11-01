export type SceneType = 'CHOICE' | 'BATTLE' | 'DONE';

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

export interface ItemEffect {
  itemEffectName: string;
  itemEffectDescription: string;
  grade: string;
}

export interface InventoryItem {
  itemDefId: string;
  acquiredAt: string;
  equipped: boolean;
  source: string;
  name: string;
  description: string;
  itemPicSrc: string;
  category: string;
  baseStat: number;
  itemEffects: ItemEffect[];
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  mainStat: string;
  grade: string;
  price: number;
}

export interface ChoiceInfo {
  detail: string;
  stats: string;
  probability: number;
}

export interface BattleTurn {
  turnInfo: string;
}

export interface RewardInfo {
  gainedItemNames: string[];
  rewardStrength: number;
  rewardAgility: number;
  rewardIntelligence: number;
  rewardLuck: number;
  rewardLife: number;
  rewardGold: number;
}

export interface GamePlayData {
  sceneType: SceneType;
  startedAt: string;
  updatedAt: string;
  background: string;
  location: string;
  progress: number;
  stageSize: number;
  playerInfo: PlayerInfo;
  npcInfo: NpcInfo;
  inventory: InventoryItem[];
}

export interface ChoiceSceneData extends GamePlayData {
  sceneType: 'CHOICE';
  choiceInfo: ChoiceInfo[];
}

export interface BattleSceneData extends GamePlayData {
  sceneType: 'BATTLE';
  curTurnId: number;
  playerHp: number[];
  enemyHp: number[];
  battleStory: BattleTurn[];
  playerWin: boolean;
}

export interface DoneSceneData extends GamePlayData {
  sceneType: 'DONE';
  rewardInfo: RewardInfo;
}

export type SceneData = ChoiceSceneData | BattleSceneData | DoneSceneData;

