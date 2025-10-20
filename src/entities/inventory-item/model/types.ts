export interface ItemEffect {
  effectProbability: string;
  effectName: string;
  description: string;
}

export interface InventoryItem {
  userItemId?: number; // MSW에서 필요
  name: string;
  description: string;
  picSrc: string | null;
  itemType: string; // e.g., "WEAPON"
  baseStat: number;
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  mainStat: string; // e.g., "LUCK"
  grade: string; // e.g., "COMMON"
  itemEffect: ItemEffect[];
  remainingUses: number;
  price: number;
}

export type InventoryResponse = InventoryItem[];
