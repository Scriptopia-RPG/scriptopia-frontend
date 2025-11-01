'use client';

import type { BattleSceneData } from '@/entities/game/model/game-play.type';

import PlayerInfoPanel from '@/features/game-play/ui/player-info-panel';

interface BattleSceneProps {
  data: BattleSceneData;
}

export const BattleScene = ({ data }: BattleSceneProps) => {
  const currentTurn = data.curTurnId;
  const isCompleted = currentTurn >= data.battleStory.length;

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

            {/* HP 정보 */}
            <div className="mb-4 flex flex-col gap-3">
              {/* 플레이어 HP */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium">나</span>
                  <span className="text-xs text-gray-500">Lv.{data.playerInfo.level}</span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${((data.playerHp[currentTurn] || 0) / data.playerInfo.healthPoint) * 100}%`,
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white">
                    {data.playerHp[currentTurn] || 0} / {data.playerInfo.healthPoint}
                  </span>
                </div>
              </div>

              {/* 적 HP */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium">{data.npcInfo.name}</span>
                  <span className="text-xs text-gray-500">Rank {data.npcInfo.rank}</span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{
                      width: `${((data.enemyHp[currentTurn] || 0) / data.enemyHp[0]) * 100}%`,
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white">
                    {data.enemyHp[currentTurn] || 0} / {data.enemyHp[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* 전투 로그 */}
            <div className="mb-4 flex flex-col gap-3">
              {data.battleStory.slice(0, currentTurn + 1).map((turn, index) => (
                <div key={index} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs leading-relaxed text-gray-700">{turn.turnInfo}</p>
                </div>
              ))}
              {isCompleted && (
                <div
                  className={`rounded-2xl border-2 p-4 ${data.playerWin ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                >
                  <p className="text-center font-medium">
                    {data.playerWin ? '✨ 승리! ✨' : '💀 패배...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
