'use client';

import type { PlayerInfo } from '@/entities/game/model/game-play.type';

interface PlayerStatusProps {
  playerInfo: PlayerInfo;
}

const PlayerStatus = ({ playerInfo }: PlayerStatusProps) => {
  return (
    <div className="bg-surface-subtle border-b border-gray-200">
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
        <div>
          <h4 className="mb-3 text-xs font-semibold text-gray-500 uppercase">특성</h4>
          <p className="text-xs leading-relaxed text-gray-600">{playerInfo.trait}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatus;
