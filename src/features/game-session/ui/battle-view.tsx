import Image from 'next/image';
import { useState, useEffect } from 'react';

import type { GameSessionData } from '@/features/game-session/model/types';

interface BattleViewProps {
  session: GameSessionData;
  onAction: (action: string) => void;
  isProcessing: boolean;
  onNextStep?: () => void;
}

const BattleView = ({ session, onAction, isProcessing, onNextStep }: BattleViewProps) => {
  const { playerInfo, npcInfo } = session;
  // select API response의 battleInfo 구조 우선 사용, fallback으로 기존 필드 사용
  const playerHp = session.battleInfo?.playerHp ?? session.playerHp ?? [];
  const enemyHp = session.battleInfo?.enemyHp ?? session.enemyHp ?? [];
  const curTurnId = session.battleInfo?.curTurnId ?? session.curTurnId ?? 0;
  const battleTurn = session.battleInfo?.battleTurn ?? session.battleStory ?? [];
  

  // 순차적 전투 기록 표시를 위한 상태
  const [visibleBattleLogs, setVisibleBattleLogs] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hasUserActed, setHasUserActed] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false);
  
  // HP 변화량 추적을 위한 상태
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [displayPlayerHp, setDisplayPlayerHp] = useState<number>(playerInfo.healthPoint);
  const [displayEnemyHp, setDisplayEnemyHp] = useState<number>(100);
  const [prevPlayerHp, setPrevPlayerHp] = useState<number>(playerInfo.healthPoint);
  const [prevEnemyHp, setPrevEnemyHp] = useState<number>(100);
  const [showPlayerHpChange, setShowPlayerHpChange] = useState(false);
  const [showEnemyHpChange, setShowEnemyHpChange] = useState(false);
  
  const battleStory = battleTurn;
  
  // battleInfo 구조 디버깅 로그 - 새로운 구조와 기존 구조 모두 확인
  console.log('🔍 전투 데이터 경로 분석:', {
    '🆕 새로운 경로': {
      'battleInfo 존재': !!session.battleInfo,
      'battleInfo.battleTurn': session.battleInfo?.battleTurn,
      'battleInfo.battleTurn 길이': session.battleInfo?.battleTurn?.length
    },
    '📜 기존 경로': {
      'battleStory': session.battleStory,
      'battleStory 길이': session.battleStory?.length
    },
    '🎯 최종 사용 데이터': {
      'battleTurn': battleTurn,
      'battleTurn 길이': battleTurn.length,
      'battleStory': battleStory,
      'battleStory 길이': battleStory.length,
      '데이터 일치': battleTurn === battleStory
    }
  });

  // 전투 로그에서 HP 파싱하는 함수
  const parseHpFromTurnInfo = (turnInfo: string) => {
    // "→ 플레이어 HP 103, NPC HP 71" 패턴 찾기
    const hpMatch = turnInfo.match(/→ 플레이어 HP (\d+), NPC HP (\d+)/);
    if (hpMatch) {
      return {
        playerHp: parseInt(hpMatch[1]),
        enemyHp: parseInt(hpMatch[2])
      };
    }
    return null;
  };

  // 현재 표시할 HP (파싱된 HP 또는 기본 HP)
  const getCurrentHpForTurn = (turnIndex: number) => {
    if (turnIndex === -1) {
      // 초기 상태
      return {
        playerHp: playerInfo.healthPoint,
        enemyHp: 100 // NPC 기본 HP
      };
    }
    
    if (battleStory[turnIndex]) {
      const parsedHp = parseHpFromTurnInfo(battleStory[turnIndex].turnInfo);
      if (parsedHp) {
        return parsedHp;
      }
    }
    
    // 파싱 실패 시 기본값
    return {
      playerHp: displayPlayerHp,
      enemyHp: displayEnemyHp
    };
  };

  const currentHp = getCurrentHpForTurn(visibleBattleLogs - 1);
  const currentPlayerHp = currentHp.playerHp;
  const currentEnemyHp = currentHp.enemyHp;

  const playerHpPercent = Math.max(0, Math.min(100, (currentPlayerHp / 100) * 100));
  const enemyHpPercent = Math.max(0, Math.min(100, (currentEnemyHp / 100) * 100));

  // 전투 기록이 변경될 때마다 순차적으로 표시 - 사용자가 버튼을 눌렀을 때만
  useEffect(() => {
    console.log('🎯 전투 로그 표시 useEffect 호출:', { 
      autoPlay, 
      battleStoryLength: battleStory.length, 
      hasUserActed, 
      visibleBattleLogs 
    });

    if (!autoPlay || battleStory.length === 0 || !hasUserActed) {
      console.log('🚫 전투 로그 표시 조건 불충족');
      return;
    }

    // 이미 모든 로그가 표시되었다면 아무것도 하지 않음
    if (visibleBattleLogs >= battleStory.length) {
      console.log('✅ 모든 전투 로그 표시 완료');
      return;
    }

    // 첫 번째 로그는 즉시 표시 (사용자가 버튼을 눌렀을 때)
    if (visibleBattleLogs === 0) {
      console.log('🎬 첫 번째 전투 로그 즉시 표시 (사용자 버튼 클릭 후)');
      setVisibleBattleLogs(1);
      return;
    }

    // 나머지 로그들은 2초 간격으로 순차적으로 표시
    const timer = setTimeout(() => {
      if (visibleBattleLogs < battleStory.length) {
        console.log('⏱️ 다음 전투 로그 표시:', visibleBattleLogs + 1, '/', battleStory.length);
        setIsAnimating(true);
        setTimeout(() => {
          setVisibleBattleLogs(prev => prev + 1);
          setIsAnimating(false);
        }, 300); // 애니메이션 효과를 위한 짧은 딜레이
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [battleStory.length, visibleBattleLogs, autoPlay, hasUserActed]);

  // HP 변화량 감지 및 애니메이션 처리 - 턴 진행 시마다 업데이트
  useEffect(() => {
    if (hasUserActed && visibleBattleLogs > 0) {
      // 이전 턴의 HP와 현재 턴의 HP 비교
      const prevHp = getCurrentHpForTurn(visibleBattleLogs - 2);
      const currentHp = getCurrentHpForTurn(visibleBattleLogs - 1);
      
      // 플레이어 HP 변화량 체크
      if (currentHp.playerHp !== prevHp.playerHp) {
        setShowPlayerHpChange(true);
        setTimeout(() => {
          setShowPlayerHpChange(false);
        }, 2000);
      }
      
      // 적 HP 변화량 체크
      if (currentHp.enemyHp !== prevHp.enemyHp) {
        setShowEnemyHpChange(true);
        setTimeout(() => {
          setShowEnemyHpChange(false);
        }, 2000);
      }
      
      // 이전 HP 업데이트
      setPrevPlayerHp(prevHp.playerHp);
      setPrevEnemyHp(prevHp.enemyHp);
      setDisplayPlayerHp(currentHp.playerHp);
      setDisplayEnemyHp(currentHp.enemyHp);
    }
  }, [visibleBattleLogs, hasUserActed]);

  // 전투 완료 감지 - 자동 진행하지 않음
  useEffect(() => {
    // 전투 기록이 모두 표시되었고 사용자가 행동했다면 전투 완료로 간주하지만 자동으로 넘어가지 않음
    if (hasUserActed && battleStory.length > 0 && visibleBattleLogs === battleStory.length && !battleCompleted) {
      console.log('🛡️ 전투 완료 상태 설정 - 자동 진행 없음');
      setBattleCompleted(true);
    }
  }, [hasUserActed, battleStory.length, visibleBattleLogs, battleCompleted]);

  // 전투 데이터가 새로 들어올 때 리셋 (새로운 전투 시작 시에만)
  useEffect(() => {
    setVisibleBattleLogs(0);
    setBattleCompleted(false);
    setCurrentTurnIndex(0);
    
    // 전투 기록이 있어도 사용자가 버튼을 누를 때까지 기다림
    setHasUserActed(false);
    setAutoPlay(true);
    
    // HP 추적 상태 초기화
    setDisplayPlayerHp(playerInfo.healthPoint);
    setDisplayEnemyHp(100);
    setPrevPlayerHp(playerInfo.healthPoint);
    setPrevEnemyHp(100);
    setShowPlayerHpChange(false);
    setShowEnemyHpChange(false);
  }, [battleTurn.length, playerInfo.healthPoint]);

  // 수동으로 다음 로그 표시
  const showNextLog = () => {
    if (visibleBattleLogs < battleStory.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setVisibleBattleLogs(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // 모든 로그 즉시 표시
  const showAllLogs = () => {
    setVisibleBattleLogs(battleStory.length);
    setAutoPlay(false);
  };

  // HP 변화량 계산 함수
  const getHpChange = (isPlayer: boolean) => {
    if (!hasUserActed || visibleBattleLogs === 0) return null;
    
    const prevHp = getCurrentHpForTurn(visibleBattleLogs - 2);
    const currentHp = getCurrentHpForTurn(visibleBattleLogs - 1);
    
    const change = isPlayer 
      ? currentHp.playerHp - prevHp.playerHp
      : currentHp.enemyHp - prevHp.enemyHp;
    
    if (change > 0) {
      return `+${change}`;
    } else if (change < 0) {
      return `${change}`;
    }
    return null;
  };

  // HP 변화량 색상 결정
  const getHpChangeColor = (isPlayer: boolean) => {
    if (!hasUserActed || visibleBattleLogs === 0) return '';
    
    const prevHp = getCurrentHpForTurn(visibleBattleLogs - 2);
    const currentHp = getCurrentHpForTurn(visibleBattleLogs - 1);
    
    const change = isPlayer 
      ? currentHp.playerHp - prevHp.playerHp
      : currentHp.enemyHp - prevHp.enemyHp;
    
    if (change > 0) {
      return 'text-green-400';
    } else if (change < 0) {
      return 'text-red-400';
    }
    return '';
  };

  if (!npcInfo) {
    return (
      <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-8 text-center text-gray-400">
        전투 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 전투 헤더 */}
      <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">전투 진행 중</h2>
          <p className="mt-2 text-sm text-gray-400">
            {playerInfo.name} vs {npcInfo.name}
          </p>
        </div>
      </div>

      {/* 전투 상태 */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* 플레이어 상태 */}
        <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#32323a] bg-[#272730]">
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{playerInfo.name}</h3>
              <p className="text-sm text-gray-400">레벨 {playerInfo.level}</p>
              
              {/* HP 바 */}
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">HP</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{currentPlayerHp} / 100</span>
                    {showPlayerHpChange && getHpChange(true) && (
                      <span 
                        className={`text-xs font-bold animate-bounce ${getHpChangeColor(true)}`}
                        style={{ 
                          animation: 'fadeInUp 0.3s ease-out, fadeOut 1.7s ease-out 0.3s forwards',
                          textShadow: '0 0 8px currentColor'
                        }}
                      >
                        {getHpChange(true)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-3 w-full rounded-full bg-[#2d2d35]">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                    style={{ width: `${playerHpPercent}%` }}
                  />
                </div>
              </div>

              {/* 스탯 */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">힘</span>
                  <span className="text-white">{playerInfo.strength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">민첩</span>
                  <span className="text-white">{playerInfo.agility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">지능</span>
                  <span className="text-white">{playerInfo.intelligence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">행운</span>
                  <span className="text-white">{playerInfo.luck}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 적 상태 */}
        <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#32323a] bg-[#272730]">
              <span className="text-2xl">⚔️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-300">{npcInfo.name}</h3>
              <p className="text-sm text-gray-400">랭크 {npcInfo.rank}</p>
              
              {/* HP 바 */}
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">HP</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{currentEnemyHp} / 100</span>
                    {showEnemyHpChange && getHpChange(false) && (
                      <span 
                        className={`text-xs font-bold animate-bounce ${getHpChangeColor(false)}`}
                        style={{ 
                          animation: 'fadeInUp 0.3s ease-out, fadeOut 1.7s ease-out 0.3s forwards',
                          textShadow: '0 0 8px currentColor'
                        }}
                      >
                        {getHpChange(false)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-3 w-full rounded-full bg-[#2d2d35]">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-500"
                    style={{ width: `${enemyHpPercent}%` }}
                  />
                </div>
              </div>

              {/* 스탯 */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">힘</span>
                  <span className="text-white">{npcInfo.strength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">민첩</span>
                  <span className="text-white">{npcInfo.agility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">지능</span>
                  <span className="text-white">{npcInfo.intelligence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">행운</span>
                  <span className="text-white">{npcInfo.luck}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 무기 정보 */}
      <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">무기 정보</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* 플레이어 무기 */}
          <div className="flex items-center gap-3 rounded-xl bg-[#1e1e24] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#35353f] bg-[#27272f]">
              <Image 
                src="/assets/철 검.png" 
                alt="플레이어 무기" 
                width={24} 
                height={24}
                onError={(e) => {
                  const target = e.currentTarget;
                  const nextSibling = target.nextElementSibling as HTMLElement;
                  target.style.display = 'none';
                  if (nextSibling) nextSibling.style.display = 'block';
                }}
              />
              <span className="text-lg" style={{ display: 'none' }}>⚔️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">플레이어 무기</p>
              <p className="text-xs text-gray-400">기본 무기</p>
            </div>
          </div>

          {/* 적 무기 */}
          <div className="flex items-center gap-3 rounded-xl bg-[#1e1e24] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#35353f] bg-[#27272f]">
              <span className="text-lg">⚔️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-300">{npcInfo.npcWeaponName}</p>
              <p className="text-xs text-gray-400">{npcInfo.npcWeaponDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 전투 액션 */}
      <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">전투 행동</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <button
            onClick={() => {
              console.log('⚔️ 공격 버튼 클릭 - 전투 로그 표시 시작', {
                현재상태: { hasUserActed, battleStoryLength: battleStory.length, visibleBattleLogs }
              });
              setHasUserActed(true);
              onAction('ATTACK');
            }}
            disabled={hasUserActed || isProcessing}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            공격하기
          </button>
          <button
            onClick={() => {
              console.log('🛡️ 방어 버튼 클릭 - 전투 로그 표시 시작');
              setHasUserActed(true);
              onAction('DEFEND');
            }}
            disabled={hasUserActed || isProcessing}
            className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-300 transition hover:bg-blue-500/20 disabled:opacity-50"
          >
            방어하기
          </button>
          <button
            onClick={() => {
              console.log('✨ 스킬 버튼 클릭 - 전투 로그 표시 시작');
              setHasUserActed(true);
              onAction('SKILL');
            }}
            disabled={hasUserActed || isProcessing}
            className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20 disabled:opacity-50"
          >
            스킬 사용
          </button>
        </div>
        
        {/* 전투 모드에서는 로딩 스피너를 표시하지 않음 - 전투 로그로 진행 상황을 보여줌 */}
        {false && isProcessing && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              전투 진행 중... (디버그: isProcessing={String(isProcessing)})
            </div>
          </div>
        )}
      </div>

      {/* 전투 준비 상태 메시지 */}
      {!hasUserActed && (
        <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
                <span className="text-2xl">⚔️</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">전투 준비 완료</h3>
            <p className="text-sm text-gray-400">
              {playerInfo.name} vs {npcInfo?.name}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              전투 행동을 선택하면 전투가 시작됩니다
            </p>
          </div>
        </div>
      )}

      {/* 전투 진행 중 상태 - 버튼 클릭했지만 아직 전투 기록이 표시되지 않은 상태 */}
      {hasUserActed && battleStory.length > 0 && visibleBattleLogs === 0 && (
        <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">전투 진행 중...</h3>
            <p className="text-sm text-gray-400">
              전투 결과를 준비하고 있습니다
            </p>
          </div>
        </div>
      )}

      {/* 순차적 전투 로그 */}
      {hasUserActed && battleStory.length > 0 && (
        <div className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300">전투 기록</h3>
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">
                {visibleBattleLogs} / {battleStory.length}
              </div>
              {visibleBattleLogs < battleStory.length && (
                <div className="flex gap-1">
                  <button
                    onClick={showNextLog}
                    className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  >
                    다음
                  </button>
                  <button
                    onClick={showAllLogs}
                    className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded border border-orange-500/30 hover:bg-orange-500/30 transition-colors"
                  >
                    모두
                  </button>
                </div>
              )}
              {autoPlay && visibleBattleLogs < battleStory.length && (
                <button
                  onClick={() => setAutoPlay(false)}
                  className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                  일시정지
                </button>
              )}
            </div>
          </div>
          <div className="space-y-3 min-h-[120px]">
            {battleStory.slice(0, visibleBattleLogs).map((battle: { turnInfo: string }, index: number) => (
              <div 
                key={index} 
                className={`rounded-lg bg-[#1e1e24] p-3 transition-all duration-500 transform ${
                  index === visibleBattleLogs - 1 ? 'animate-fadeInUp' : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300 flex-1">
                    {battle.turnInfo}
                  </p>
                </div>
              </div>
            ))}
            
            {/* 다음 로그 로딩 표시 */}
            {visibleBattleLogs < battleStory.length && (
              <div className="rounded-lg bg-[#1e1e24]/50 border border-dashed border-gray-600 p-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs">다음 전투 기록을 기다리는 중...</span>
                </div>
              </div>
            )}
            
            {/* 모든 로그가 표시되었을 때 */}
            {visibleBattleLogs === battleStory.length && battleStory.length > 0 && !battleCompleted && (
              <div className="text-center mt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-300">전투 기록 완료</span>
                </div>
              </div>
            )}
            
            {/* 전투 완료 상태 */}
            {battleCompleted && (
              <div className="text-center mt-4 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-300 font-medium">전투 완료!</span>
                </div>
                {onNextStep && (
                  <button
                    onClick={onNextStep}
                    className="bg-gradient-primary rounded-xl px-8 py-3 text-sm font-semibold text-white transition hover:scale-105 shadow-lg"
                  >
                    다음 단계로 진행
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleView;