import Image from 'next/image';

import { useAllUserItems, UserGameItem } from '@/features/game-create/api/use-user-items.query';
import { getSafeImageUrl, handleImageError } from '@/shared/utils/image-utils';

interface ItemStepProps {
  selectedItemId: string | null;
  onSelect: (itemId: string) => void;
}

const CATEGORY_MAP = {
  WEAPON: '무기',
  ARMOR: '방어구', 
  ACCESSORY: '악세서리',
} as const;

const CATEGORY_ORDER = ['무기', '방어구', '악세서리'] as const;
const SLOTS_PER_ROW = 4;

// API 타입을 한국어 카테고리로 변환
const getKoreanCategory = (itemType: UserGameItem['itemType']): string => {
  return CATEGORY_MAP[itemType] || '기타';
};

const ItemStep = ({ selectedItemId, onSelect }: ItemStepProps) => {
  const { data: userItems = [], isLoading, error } = useAllUserItems();

  // API 데이터를 카테고리별로 분류
  const itemsByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    items: userItems.filter((item) => getKoreanCategory(item.itemType) === category),
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 text-white">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">아이템 선택하기</h1>
          <p className="text-sm text-gray-400 sm:text-base">아이템을 불러오는 중...</p>
        </header>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-10 text-white">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">아이템 선택하기</h1>
          <p className="text-sm text-red-400 sm:text-base">아이템을 불러오는데 실패했습니다.</p>
        </header>
        <div className="text-center text-gray-400">
          <p>로그인 상태를 확인해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 text-white">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">아이템 선택하기</h1>
        <p className="text-sm text-gray-400 sm:text-base">아이템은 최대 1개 선택할 수 있습니다.</p>
      </header>

      <div className="flex flex-col gap-6">
        {itemsByCategory.map(({ category, items }) => (
          <div key={category} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-400 sm:text-base">{category}</h2>
            <div className="grid grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: SLOTS_PER_ROW }).map((_, index) => {
                const item = items[index];
                const isSelected = item && item.id === selectedItemId;
                return (
                  <button
                    key={item?.id ?? `placeholder-${category}-${index}`}
                    type="button"
                    onClick={() => item && onSelect(item.id)}
                    disabled={!item}
                    className={
                      'group relative flex aspect-square items-center justify-center rounded-2xl border border-[#31313a] bg-gradient-to-b from-[#2a2a32] to-[#1c1c23] transition ' +
                      (isSelected ? 'border-[#ff8c1a] shadow-[0_0_0_2px_rgba(255,140,26,0.45)]' : 'hover:border-[#ff8c1a]/60')
                    }
                  >
                    {item ? (
                      <>
                        <Image
                          src={getSafeImageUrl(item.picSrc, item.itemType)}
                          alt={item.name}
                          width={72}
                          height={72}
                          className="h-14 w-14 object-contain sm:h-20 sm:w-20"
                          onError={(e) => handleImageError(item.name, item.picSrc, e)}
                        />
                        {isSelected && (
                          <Image
                            src="/assets/체크표시.svg"
                            alt="선택됨"
                            width={36}
                            height={36}
                            className="absolute -top-3 -right-3 h-9 w-9"
                          />
                        )}
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-200 truncate w-full px-1 text-center">
                          {item.name}
                        </span>
                        {/* 등급 표시 */}
                        <div className={`absolute -top-1 -left-1 h-3 w-3 rounded-full ${
                          item.grade === 'LEGENDARY' ? 'bg-orange-500' :
                          item.grade === 'EPIC' ? 'bg-purple-500' :
                          item.grade === 'RARE' ? 'bg-blue-500' : 'bg-gray-500'
                        } shadow-sm`} />
                      </>
                    ) : (
                      <span className="text-xs text-gray-600">-</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemStep;
