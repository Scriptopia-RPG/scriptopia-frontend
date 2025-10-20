import { useInventory } from '@/entities/inventory-item/api/use-inventory.query';
import Image from 'next/image';

const InventoryList = () => {
  const { data: inventoryData, isLoading, isError } = useInventory();
  
  // MSW에서 { items: [...] } 형태로 반환하므로 배열 추출
  const inventory = (inventoryData as any)?.items || inventoryData || [];

  if (isLoading) {
    return <div className="text-center text-gray-400">인벤토리를 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-400">오류가 발생했습니다.</div>;
  }

  if (!inventory || inventory.length === 0) {
    return <div className="text-center text-gray-500">보유한 아이템이 없습니다.</div>;
  }

  // 아이템을 카테고리별로 분류
  const weapons = inventory.filter(item => item.itemType === 'WEAPON');
  const armors = inventory.filter(item => item.itemType === 'ARMOR');
  const consumables = inventory.filter(item => item.itemType === 'CONSUMABLE');

  const getGradeColor = (grade: string | undefined | null) => {
    if (!grade) return 'border-gray-500/30 bg-gray-500/10';
    
    switch (grade.toUpperCase()) {
      case 'COMMON': return 'border-gray-500/30 bg-gray-500/10';
      case 'UNCOMMON': return 'border-green-500/30 bg-green-500/10';
      case 'RARE': return 'border-blue-500/30 bg-blue-500/10';
      case 'EPIC': return 'border-purple-500/30 bg-purple-500/10';
      case 'LEGENDARY': return 'border-yellow-500/30 bg-yellow-500/10';
      default: return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const CategorySection = ({ title, items, icon }: { title: string, items: any[], icon: string }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-sm text-gray-400">({items.length})</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={index} className={`rounded-2xl border ${getGradeColor(item.grade || 'COMMON')} p-4 transition-all hover:scale-105 cursor-pointer group`}>
            <div className="relative aspect-square rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 mb-3 flex items-center justify-center">
              {item.picSrc ? (
                <Image
                  src={item.picSrc}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              ) : (
                <div className="text-3xl">
                  {item.itemType === 'WEAPON' ? '⚔️' : 
                   item.itemType === 'ARMOR' ? '🛡️' : '🧪'}
                </div>
              )}
              {item.remainingUses && (
                <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {item.remainingUses}
                </div>
              )}
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-white line-clamp-2 leading-tight">{item.name}</p>
              <div className="flex items-center justify-center gap-1 text-xs">
                <span className={`px-2 py-0.5 rounded-full ${
                  item.grade === 'COMMON' ? 'bg-gray-500/20 text-gray-300' :
                  item.grade === 'UNCOMMON' ? 'bg-green-500/20 text-green-300' :
                  item.grade === 'RARE' ? 'bg-blue-500/20 text-blue-300' :
                  item.grade === 'EPIC' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {item.grade}
                </span>
              </div>
              {item.baseStat && (
                <p className="text-xs text-gray-400">공격력 {item.baseStat}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {weapons.length > 0 && (
        <CategorySection title="무기" items={weapons} icon="⚔️" />
      )}
      {armors.length > 0 && (
        <CategorySection title="방어구" items={armors} icon="🛡️" />
      )}
      {consumables.length > 0 && (
        <CategorySection title="유물" items={consumables} icon="🧪" />
      )}
    </div>
  );
};

export default InventoryList;
