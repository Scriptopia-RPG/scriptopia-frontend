'use client';

import type { ChoiceSceneData } from '@/entities/game/model/game-play.type';

import PlayerInfoPanel from '@/features/game-play/ui/player-info-panel';

interface ChoiceSceneProps {
  data: ChoiceSceneData;
  onChoiceSelect: (choiceIndex: number) => void;
}

export const ChoiceScene = ({ data, onChoiceSelect }: ChoiceSceneProps) => {
  return (
    <div className="flex h-full">
      {/* 좌측 플레이어 정보 - 모바일에서 숨김 */}
      <div className="hidden md:block">
        <PlayerInfoPanel playerInfo={data.playerInfo} inventory={data.inventory} />
      </div>

      {/* 우측 콘텐츠 - 채팅 형식 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 상단 고정 헤더 */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-bg p-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{data.location}</span>
            <span className="text-gray-500">
              {data.progress} / {data.stageSize}
            </span>
          </div>
          <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-gradient-primary h-full transition-all"
              style={{ width: `${(data.progress / data.stageSize) * 100}%` }}
            />
          </div>
        </div>

        {/* 스크롤 가능한 메시지 영역 */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-2xl p-4">
            {/* 배경 스토리 */}
            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{data.background}</p>
            </div>

            {/* 선택지 */}
            <div className="mb-4 flex flex-col gap-3">
              <h3 className="px-2 text-xs font-medium text-gray-500">어떻게 하시겠습니까?</h3>
              {data.choiceInfo.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoiceSelect(index)}
                  className="bg-white hover:bg-primary/5 rounded-2xl border border-gray-200 p-4 text-left transition-colors shadow-sm"
                >
                  <p className="text-sm leading-relaxed">{choice.detail}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">{choice.stats}</span>
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
