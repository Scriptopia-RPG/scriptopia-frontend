'use client';

import type { InventoryItem } from '@/entities/game/model/game-play.type';

interface EquippedItemsProps {
  inventory?: InventoryItem[];
}

export const EquippedItems = ({ inventory }: EquippedItemsProps) => {
  const equippedItems = inventory?.filter((item) => item.equipped) || [];

  return (
    <div className="bg-bg overflow-y-auto">
      <div className="p-6">
        <h4 className="mb-3 text-xs font-semibold text-gray-500 uppercase">장착 장비</h4>
        {equippedItems.length > 0 ? (
          <div className="flex flex-col gap-2">
            {equippedItems.map((item) => (
              <div key={item.itemDefId} className="rounded-lg border border-gray-200 p-3">
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-xs font-medium">{item.name}</p>
                  <span
                    className={`text-[10px] font-medium uppercase ${
                      item.grade === 'COMMON'
                        ? 'text-gray-600'
                        : item.grade === 'RARE'
                          ? 'text-blue-600'
                          : item.grade === 'EPIC'
                            ? 'text-purple-600'
                            : 'text-orange-600'
                    }`}
                  >
                    {item.grade}
                  </span>
                </div>
                <p className="mb-2 text-xs text-gray-500">{item.description}</p>
                {item.itemEffects.length > 0 && (
                  <div className="border-t border-gray-200 pt-2">
                    {item.itemEffects.map((effect, idx) => (
                      <p key={idx} className="text-[10px] text-blue-600">
                        {effect.itemEffectName}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">장착한 장비가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

