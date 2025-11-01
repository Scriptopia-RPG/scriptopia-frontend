'use client';

import type { DoneSceneData } from '@/entities/game/model/game-play.type';
import Button from '@/shared/ui/button/button';

interface DoneSceneProps {
  data: DoneSceneData;
  onNext?: () => void;
  onShare?: () => void;
}

export const DoneScene = ({ data, onNext, onShare }: DoneSceneProps) => {
  const hasRewards =
    data.rewardInfo.rewardStrength !== 0 ||
    data.rewardInfo.rewardAgility !== 0 ||
    data.rewardInfo.rewardIntelligence !== 0 ||
    data.rewardInfo.rewardLuck !== 0 ||
    data.rewardInfo.rewardLife !== 0 ||
    data.rewardInfo.rewardGold !== 0 ||
    data.rewardInfo.gainedItemNames.length > 0;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* 배경 */}
      <div className="bg-surface-subtle flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-500">{data.location}</p>
          <p className="leading-relaxed whitespace-pre-wrap">{data.background}</p>
        </div>
      </div>

      {/* 보상 */}
      {hasRewards && (
        <div className="border-b border-green-200 bg-green-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">보상</h3>
          <div className="flex flex-col gap-2">
            {data.rewardInfo.rewardStrength !== 0 && (
              <div className="flex justify-between text-sm">
                <span>힘</span>
                <span className="font-medium">+{data.rewardInfo.rewardStrength}</span>
              </div>
            )}
            {data.rewardInfo.rewardAgility !== 0 && (
              <div className="flex justify-between text-sm">
                <span>민첩성</span>
                <span className="font-medium">+{data.rewardInfo.rewardAgility}</span>
              </div>
            )}
            {data.rewardInfo.rewardIntelligence !== 0 && (
              <div className="flex justify-between text-sm">
                <span>지능</span>
                <span className="font-medium">+{data.rewardInfo.rewardIntelligence}</span>
              </div>
            )}
            {data.rewardInfo.rewardLuck !== 0 && (
              <div className="flex justify-between text-sm">
                <span>운</span>
                <span className="font-medium">+{data.rewardInfo.rewardLuck}</span>
              </div>
            )}
            {data.rewardInfo.rewardLife !== 0 && (
              <div className="flex justify-between text-sm">
                <span>생명력</span>
                <span className="font-medium">+{data.rewardInfo.rewardLife}</span>
              </div>
            )}
            {data.rewardInfo.rewardGold !== 0 && (
              <div className="flex justify-between text-sm">
                <span>골드</span>
                <span className="font-medium">+{data.rewardInfo.rewardGold}</span>
              </div>
            )}
            {data.rewardInfo.gainedItemNames.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-500">획득 아이템</span>
                {data.rewardInfo.gainedItemNames.map((itemName) => (
                  <span key={itemName} className="text-sm">
                    • {itemName}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 버튼 */}
      {(onNext || onShare) && (
        <div className="bg-bg border-t border-gray-200 p-6">
          <div className="mx-auto flex max-w-2xl gap-3">
            {onShare && <Button label="공유하기" onClick={onShare} variant="outline" size="full" />}
            {onNext && <Button label="다음으로" onClick={onNext} variant="primary" size="full" />}
          </div>
        </div>
      )}
    </div>
  );
};
