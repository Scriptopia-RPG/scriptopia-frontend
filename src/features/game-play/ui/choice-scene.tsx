'use client';

import type { ChoiceSceneData } from '@/entities/game/model/game-play.type';

import { PlayerInfoPanel } from '@/features/game-play/ui/player-info-panel';

interface ChoiceSceneProps {
  data: ChoiceSceneData;
  onChoiceSelect: (choiceIndex: number) => void;
}

export const ChoiceScene = ({ data, onChoiceSelect }: ChoiceSceneProps) => {
  return (
    <div className="flex h-full overflow-hidden">
      {/* 좌측 플레이어 정보 */}
      <PlayerInfoPanel playerInfo={data.playerInfo} inventory={data.inventory} />

      {/* 우측 콘텐츠 */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* 배경 및 위치 */}
        <div className="bg-surface-subtle flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-gray-500">{data.location}</p>
            <p className="leading-relaxed whitespace-pre-wrap">{data.background}</p>
          </div>
        </div>

        {/* 진행도 */}
        <div className="bg-bg border-b border-gray-200 p-4">
          <div className="flex justify-between text-sm">
            <span>진행도</span>
            <span className="font-medium">
              {data.progress} / {data.stageSize}
            </span>
          </div>
          <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-gradient-primary h-full transition-all"
              style={{ width: `${(data.progress / data.stageSize) * 100}%` }}
            />
          </div>
        </div>

        {/* 선택지 */}
        <div className="flex flex-1 flex-col">
          <div className="mx-auto w-full max-w-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold">어떻게 하시겠습니까?</h3>
            <div className="flex flex-col gap-3">
              {data.choiceInfo.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoiceSelect(index)}
                  className="bg-surface-subtle hover:border-primary rounded-lg border border-gray-200 p-4 text-left transition-colors"
                >
                  <p className="text-sm leading-relaxed">{choice.detail}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span>{choice.stats}</span>
                    <span className="text-gray-400">•</span>
                    <span>{choice.probability}% 성공 확률</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
