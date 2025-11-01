'use client';

import type { DoneSceneData } from '@/entities/game/model/game-play.type';

import Button from '@/shared/ui/button/button';
import PlayerInfoPanel from '@/features/game-play/ui/player-info-panel';

interface DoneSceneProps {
  data: DoneSceneData;
  onNext?: () => void;
  isPending?: boolean;
}

export const DoneScene = ({ data, onNext, isPending }: DoneSceneProps) => {
  const hasRewards =
    data.rewardInfo.rewardStrength !== 0 ||
    data.rewardInfo.rewardAgility !== 0 ||
    data.rewardInfo.rewardIntelligence !== 0 ||
    data.rewardInfo.rewardLuck !== 0 ||
    data.rewardInfo.rewardLife !== 0 ||
    data.rewardInfo.rewardGold !== 0 ||
    data.rewardInfo.gainedItemNames.length > 0;

  return (
    <div className="flex h-full">
      {/* 좌측 플레이어 정보 - 모바일에서 숨김 */}
      <div className="hidden md:block">
        <PlayerInfoPanel playerInfo={data.playerInfo} inventory={data.inventory} />
      </div>

      {/* 우측 콘텐츠 - 채팅 형식 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 상단 고정 헤더 */}
        <div className="bg-bg flex-shrink-0 border-b border-gray-200 p-4">
          <div className="text-sm">
            <span className="font-medium">{data.location}</span>
          </div>
        </div>

        {/* 스크롤 가능한 메시지 영역 */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-2xl p-4">
            {/* 배경 스토리 */}
            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{data.background}</p>
            </div>

            {/* 보상 */}
            {hasRewards && (
              <div className="mb-4 rounded-2xl border-2 border-green-500 bg-green-50 p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold">✨ 보상</h3>
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
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        {onNext && (
          <div className="bg-bg flex-shrink-0 border-t border-gray-200 p-4">
            <div className="mx-auto flex max-w-2xl gap-3">
              {onNext && (
                <Button
                  label={isPending ? '진행 중...' : '다음으로'}
                  onClick={onNext}
                  variant="primary"
                  size="full"
                  disabled={isPending}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
