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
    <div className="flex h-full overflow-hidden">
      {/* 좌측 플레이어 정보 */}
      <PlayerInfoPanel playerInfo={data.playerInfo} inventory={data.inventory} />

      {/* 우측 콘텐츠 */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* 배경 */}
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

        {/* 전투 정보 */}
        <div className="bg-bg border-b border-gray-200 p-4">
          <div className="flex flex-col gap-3">
            {/* 플레이어 정보 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{data.playerInfo.name}</span>
                <span className="text-xs text-gray-500">Lv.{data.playerInfo.level}</span>
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{
                    width: `${((data.playerHp[currentTurn] || 0) / data.playerInfo.healthPoint) * 100}%`,
                  }}
                />
                <span className="text-primary/80 absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {data.playerHp[currentTurn] || 0} / {data.playerInfo.healthPoint}
                </span>
              </div>
            </div>

            {/* 적 정보 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{data.npcInfo.name}</span>
                <span className="text-xs text-gray-500">Rank {data.npcInfo.rank}</span>
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-red-500 transition-all"
                  style={{
                    width: `${((data.enemyHp[currentTurn] || 0) / data.enemyHp[0]) * 100}%`,
                  }}
                />
                <span className="text-primary/80 absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {data.enemyHp[currentTurn] || 0} / {data.enemyHp[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 전투 로그 */}
        <div className="flex flex-1 flex-col">
          <div className="mx-auto w-full max-w-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold">전투 상황</h3>
            <div className="flex flex-col gap-3">
              {data.battleStory.slice(0, currentTurn + 1).map((turn, index) => (
                <div
                  key={index}
                  className="bg-surface-subtle rounded-lg border border-gray-200 p-4"
                >
                  <p className="text-sm leading-relaxed">{turn.turnInfo}</p>
                </div>
              ))}
              {isCompleted && (
                <div
                  className={`rounded-lg border-2 p-4 ${data.playerWin ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
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
