interface GameHistoryData {
  uuid: string;
  gameId?: string;
  userId: number;
  thumbnailUrl?: string;
  title?: string;
  worldView: string;
  backgroundStory: string;
  worldPrompt: string;
  characterName?: string;
  characterDescription?: string;
  epilogue1Title?: string;
  epilogue1Content?: string;
  epilogue2Title?: string;
  epilogue2Content?: string;
  epilogue3Title?: string;
  epilogue3Content?: string;
  epilogueContent?: string;
  stageSize?: number;
  score?: number;
  level?: number;
  endingText?: string;
  gameCreatedAt?: string;
  gameEndedAt?: string;
  createdAt: string;
  isShared: boolean;
}

interface GameHistoryResultProps {
  historyData: GameHistoryData;
  onClose: () => void;
}

const GameHistoryResult = ({ historyData, onClose }: GameHistoryResultProps) => {
  // 실제 데이터나 더미 데이터로 채우기
  const gameTitle = historyData.title || historyData.worldPrompt || "화성 정착 모험";
  const characterName = historyData.characterName || "머스크박";
  const characterDescription = historyData.characterDescription || "화성 정착을 위한 테술라의 혁신적인 엔지니어. 과학과 공학에 깊은 관심을 가지고 있으며, 인류의 우주 진출을 위해 헌신하는 개척자.";
  const finalScore = historyData.score ?? Math.floor(Math.random() * 1000) + 500;
  const finalLevel = historyData.level ?? Math.floor(Math.random() * 10) + 15;
  const stageCount = historyData.stageSize ?? 12;
  
  // 플레이 시간 계산
  const playTime = historyData.gameEndedAt && historyData.gameCreatedAt 
    ? Math.floor((new Date(historyData.gameEndedAt).getTime() - new Date(historyData.gameCreatedAt).getTime()) / 60000)
    : historyData.createdAt 
    ? Math.floor(Math.random() * 45) + 15 // 15-60분 랜덤
    : 32;

  // 완료율 계산
  const completionRate = stageCount > 0 ? 100 : 100; // 완료된 게임이므로 100%
  
  // 에필로그들을 하나로 합치기
  const allEpilogues = [
    historyData.epilogue1Content,
    historyData.epilogue2Content, 
    historyData.epilogue3Content,
    historyData.epilogueContent
  ].filter(Boolean);
  
  const combinedEpilogue = allEpilogues.length > 0 
    ? allEpilogues.join('\n\n--- 다음 장 ---\n\n')
    : "머스크박의 화성 모험이 성공적으로 완료되었습니다. 그의 용기와 지혜로 화성에서의 새로운 삶의 기반을 마련했습니다.";
  
  // 엔딩 텍스트 생성
  const endingText = historyData.endingText || 
    `${characterName}의 화성 모험이 막을 내렸습니다. ${stageCount}개의 도전을 성공적으로 완수하며 화성 정착의 새로운 장을 열었습니다. 테술라의 혁신 기술과 인간의 의지가 만나 불가능을 가능으로 바꾼 위대한 여정이었습니다.`;
  
  // 더미 통계 데이터
  const gameStats = {
    totalActions: Math.floor(Math.random() * 50) + 30,
    battlesWon: Math.floor(Math.random() * 8) + 5,
    itemsCollected: Math.floor(Math.random() * 15) + 8,
    goldEarned: Math.floor(Math.random() * 200) + 100,
    questsCompleted: Math.floor(Math.random() * 10) + 6
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#17171c] border border-[#2a2a32] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* 헤더 */}
        <div className="sticky top-0 bg-[#17171c] border-b border-[#2a2a32] p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{gameTitle}</h1>
              <p className="text-gray-400">모험의 결과를 확인해보세요</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-[#2a2a32] border border-[#3a3a42] text-gray-400 hover:text-white hover:bg-[#32323a] transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 게임 기본 정보 */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-blue-400">{finalScore.toLocaleString()}</div>
              <div className="text-sm text-gray-400">최종 점수</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-green-400">레벨 {finalLevel}</div>
              <div className="text-sm text-gray-400">도달 레벨</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-purple-400">{playTime}분</div>
              <div className="text-sm text-gray-400">플레이 시간</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-2xl font-bold text-orange-400">{completionRate}%</div>
              <div className="text-sm text-gray-400">완료율</div>
            </div>
          </div>

          {/* 캐릭터 정보 */}
          <div className="bg-[#1e1e24] border border-[#2a2a32] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>👤</span> 캐릭터 정보
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">이름:</span>
                <p className="text-white font-medium">{characterName}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">특성:</span>
                <p className="text-gray-300 leading-relaxed">{characterDescription}</p>
              </div>
            </div>
          </div>

          {/* 게임 통계 */}
          <div className="bg-[#1e1e24] border border-[#2a2a32] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>📊</span> 게임 통계
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#2a2a32] rounded-lg p-3 text-center">
                <div className="text-lg mb-1">⚔️</div>
                <div className="text-lg font-bold text-red-400">{gameStats.battlesWon}</div>
                <div className="text-xs text-gray-400">승리한 전투</div>
              </div>
              <div className="bg-[#2a2a32] rounded-lg p-3 text-center">
                <div className="text-lg mb-1">🎒</div>
                <div className="text-lg font-bold text-blue-400">{gameStats.itemsCollected}</div>
                <div className="text-xs text-gray-400">획득한 아이템</div>
              </div>
              <div className="bg-[#2a2a32] rounded-lg p-3 text-center">
                <div className="text-lg mb-1">💰</div>
                <div className="text-lg font-bold text-yellow-400">{gameStats.goldEarned}</div>
                <div className="text-xs text-gray-400">획득한 골드</div>
              </div>
              <div className="bg-[#2a2a32] rounded-lg p-3 text-center">
                <div className="text-lg mb-1">🎯</div>
                <div className="text-lg font-bold text-green-400">{gameStats.questsCompleted}</div>
                <div className="text-xs text-gray-400">완료한 퀘스트</div>
              </div>
              <div className="bg-[#2a2a32] rounded-lg p-3 text-center">
                <div className="text-lg mb-1">🎮</div>
                <div className="text-lg font-bold text-purple-400">{gameStats.totalActions}</div>
                <div className="text-xs text-gray-400">총 행동 수</div>
              </div>
              <div className="bg-[#2a2a32] rounded-lg p-3 text-center">
                <div className="text-lg mb-1">📈</div>
                <div className="text-lg font-bold text-orange-400">{stageCount}</div>
                <div className="text-xs text-gray-400">진행한 단계</div>
              </div>
            </div>
          </div>

          {/* 세계관 */}
          <div className="bg-[#1e1e24] border border-[#2a2a32] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🌍</span> 세계관
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {historyData.worldView}
            </p>
          </div>

          {/* 배경 스토리 */}
          <div className="bg-[#1e1e24] border border-[#2a2a32] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>📖</span> 배경 스토리
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {historyData.backgroundStory}
            </p>
          </div>

          {/* 엔딩 */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <span>✨</span> 엔딩
            </h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {endingText}
            </p>
          </div>

          {/* 에필로그 */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <span>📝</span> 모험 기록
            </h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {combinedEpilogue}
            </p>
          </div>

          {/* 게임 정보 */}
          <div className="bg-[#1e1e24] border border-[#2a2a32] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>ℹ️</span> 게임 정보
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">게임 ID:</span>
                  <span className="text-white font-mono text-sm">{historyData.uuid.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">진행도:</span>
                  <span className="text-white">{stageCount} 단계</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">플레이어:</span>
                  <span className="text-white">ID #{historyData.userId}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">생성 시간:</span>
                  <span className="text-white text-sm">
                    {new Date(historyData.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">공개 설정:</span>
                  <span className={`text-sm ${historyData.isShared ? 'text-green-400' : 'text-gray-400'}`}>
                    {historyData.isShared ? '공개' : '비공개'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">난이도:</span>
                  <span className="text-orange-400 text-sm">화성 탐험</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-primary rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
            >
              게임 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHistoryResult;