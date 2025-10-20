import { useState } from 'react';
import { useGameHistory } from '@/entities/game-history/api/use-game-history.query';
import GameHistoryResult from '@/features/game-session/ui/game-history-result';
import Button from '@/shared/ui/button/button';

const GameHistoryList = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useGameHistory();
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  if (isLoading) {
    return <div className="text-center text-gray-400">게임 히스토리를 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-400">오류가 발생했습니다.</div>;
  }

  const allHistories = data?.pages.flatMap(page => page.data) ?? [];

  if (allHistories.length === 0) {
    return <div className="text-center text-gray-500">완료한 게임 기록이 없습니다.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allHistories.map((history) => (
          <div 
            key={history.historyUUID} 
            className="rounded-2xl border border-[#35353f] bg-[#23232a] overflow-hidden cursor-pointer transition-all hover:scale-105 hover:border-[#45454f]"
            onClick={() => setSelectedHistory({
              uuid: history.historyUUID,
              title: history.title,
              worldView: history.worldView,
              backgroundStory: history.backgroundStory,
              worldPrompt: history.backgroundStory,
              epilogue1Content: history.epilogue1Content,
              epilogue2Content: history.epilogue2Content,
              epilogue3Content: history.epilogue3Content,
              score: history.score,
              createdAt: history.createdAt,
              isShared: history.isShared
            })}
          >
            <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
              {history.thumbnailUrl ? (
                <img 
                  src={history.thumbnailUrl} 
                  alt={history.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl">🎮</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white text-lg mb-2 line-clamp-1">{history.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{history.backgroundStory}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(history.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-yellow-400">⭐ {history.score}</span>
                  {history.isShared && (
                    <span className="text-xs text-orange-400">📢 공유중</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </Button>
        </div>
      )}
      {selectedHistory && (
        <GameHistoryResult 
          historyData={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </>
  );
};

export default GameHistoryList;
