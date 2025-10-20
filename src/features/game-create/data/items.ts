export type ItemCategory = '무기' | '방어구' | '악세서리';

export interface GameItemMeta {
  id: string;
  name: string;
  category: ItemCategory;
  image: string;
}

export const GAME_ITEMS: GameItemMeta[] = [
  {
    id: 'steel-axe',
    name: '철 도끼',
    category: '무기',
    image: '/assets/철 도끼.png',
  },
  {
    id: 'steel-sword',
    name: '철 검',
    category: '무기',
    image: '/assets/철 검.png',
  },
  {
    id: 'ethereal-staff',
    name: '무형의 지팡이',
    category: '무기',
    image: '/assets/무형의 지팡이.png',
  },
  {
    id: 'flame-trace',
    name: '화염의 궤',
    category: '악세서리',
    image: '/assets/화염의 궤.png',
  },
  {
    id: 'steel-armor',
    name: '강철 갑옷',
    category: '방어구',
    image: '/assets/강철 갑옷.png',
  },
];
