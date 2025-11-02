import type { ShopItem } from '../model/pia-shop.type';

interface ShopItemCardProps {
  item: ShopItem;
  onClick: () => void;
}

const ShopItemCard = ({ item, onClick }: ShopItemCardProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-surface-subtle dark:bg-surface relative flex flex-col rounded-lg border border-gray-200 p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:hover:border-gray-600"
    >
      {/* 아이템 이미지 영역 - 나중에 추가 예정 */}
      <div className="mb-3 flex aspect-square items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
        {/* 이미지가 추가되면 여기에 Image 컴포넌트를 넣을 예정 */}
      </div>
      <h3 className="text-fg mb-2 text-center text-sm font-medium sm:text-base">{item.name}</h3>
      <div className="mt-auto flex items-center justify-center gap-1.5">
        <span className="text-lg">🪙</span>
        <span className="text-fg text-sm font-semibold sm:text-base">
          {formatPrice(item.price)}
        </span>
      </div>
    </button>
  );
};

export default ShopItemCard;
