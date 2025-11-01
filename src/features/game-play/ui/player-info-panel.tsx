'use client';

import type { PlayerInfo, InventoryItem } from '@/entities/game/model/game-play.type';

interface PlayerInfoPanelProps {
  playerInfo: PlayerInfo;
  inventory?: InventoryItem[];
}

export const PlayerInfoPanel = ({ playerInfo, inventory }: PlayerInfoPanelProps) => {
  const equippedItems = inventory?.filter((item) => item.equipped) || [];

  return (
    <div className="bg-surface-subtle w-full border-r border-gray-200 sm:w-72">
      <div className="sticky top-0 p-6">
        {/* 플레이어 정보 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold">{playerInfo.name}</h3>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">레벨</span>
              <span className="font-medium">Lv.{playerInfo.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">생명력</span>
              <span className="font-medium">{playerInfo.life}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">HP</span>
              <span className="font-medium">{playerInfo.healthPoint}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">경험치</span>
              <span className="font-medium">{playerInfo.experiencePoint}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">골드</span>
              <span className="font-medium">{playerInfo.gold}</span>
            </div>
          </div>
        </div>

        {/* 능력치 */}
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-semibold text-gray-500 uppercase">능력치</h4>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">힘 (STR)</span>
              <span className="font-medium">{playerInfo.strength}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">민첩 (AGI)</span>
              <span className="font-medium">{playerInfo.agility}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">지능 (INT)</span>
              <span className="font-medium">{playerInfo.intelligence}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">운 (LUK)</span>
              <span className="font-medium">{playerInfo.luck}</span>
            </div>
          </div>
        </div>

        {/* 특성 */}
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-semibold text-gray-500 uppercase">특성</h4>
          <p className="text-xs leading-relaxed text-gray-600">{playerInfo.trait}</p>
        </div>

        {/* 장착 장비 */}
        <div>
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
    </div>
  );
};
