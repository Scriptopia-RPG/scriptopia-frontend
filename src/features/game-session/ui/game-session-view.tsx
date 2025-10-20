import ChoiceList from '@/features/game-session/ui/choice-list';
import LogTimeline from '@/features/game-session/ui/log-timeline';
import PlayerSidebar from '@/features/game-session/ui/player-sidebar';
import PromptInput from '@/features/game-session/ui/prompt-input';
import StoryPanel from '@/features/game-session/ui/story-panel';
import BattleView from '@/features/game-session/ui/battle-view';
import ShopView from '@/features/game-session/ui/shop-view';
import ChatTimeline, { type ChatMessage } from '@/features/game-session/ui/chat-timeline';
import GameHistoryResult from '@/features/game-session/ui/game-history-result';
import type { GameSessionData } from '@/features/game-session/model/types';
import { useState, useEffect } from 'react';

interface GameSessionViewProps {
  session: GameSessionData;
  gameId: string;
  choiceMutation: { mutate: (choiceId: string) => void; isPending: boolean };
  promptMutation: { mutate: (prompt: string) => void; isPending: boolean };
  historyMutation: { mutate: (gameId: string) => void; isPending: boolean; isSuccess: boolean; data?: any };
  buyItemMutation?: { mutate: (shopItemId: string) => void; isPending: boolean };
  sellItemMutation?: { mutate: (inventoryItemId: string) => void; isPending: boolean };
  useItemMutation?: { mutate: (itemId: string) => void; isPending: boolean };
  dropItemMutation?: { mutate: (itemId: string) => void; isPending: boolean };
  toggleEquipItemMutation?: { mutate: (itemId: string) => void; isPending: boolean };
  onGameOver: () => void;
}

const GameSessionView = ({ session, gameId, choiceMutation, promptMutation, historyMutation, buyItemMutation, sellItemMutation, useItemMutation, dropItemMutation, toggleEquipItemMutation, onGameOver }: GameSessionViewProps) => {
  // 플레이어 사망 체크 (life가 0이하인지 확인)
  const isPlayerDead = session.playerInfo?.life <= 0;
  
  // 전투 모드 유지를 위한 상태 - 전투가 시작되면 수동으로 완료할 때까지 유지
  const [isBattleMode, setIsBattleMode] = useState(false);
  const [battleSession, setBattleSession] = useState<GameSessionData | null>(null);
  
  // 상점 모드 유지를 위한 상태 - 상점이 시작되면 수동으로 완료할 때까지 유지
  const [isShopMode, setIsShopMode] = useState(false);
  const [shopSession, setShopSession] = useState<GameSessionData | null>(null);
  
  // 채팅 메시지 상태 관리
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  
  // 히스토리 결과 모달 상태
  const [showHistoryResult, setShowHistoryResult] = useState(false);
  
  // 처리된 전투 세션 추적
  const [completedBattles, setCompletedBattles] = useState<Set<string>>(new Set());
  
  // 전투 모드 감지 및 관리
  useEffect(() => {
    if (session.sceneType === 'BATTLE' && !isBattleMode) {
      // 고유한 전투 식별자 생성 (progress + location + updatedAt)
      const battleId = `${session.progress}-${session.location}-${session.updatedAt}`;
      
      if (!completedBattles.has(battleId)) {
        console.log('⚔️ 전투 모드 시작 -', battleId);
        setIsBattleMode(true);
        setBattleSession(session);
      } else {
        console.log('⚔️ 이미 완료된 전투 - 전투 모드 시작하지 않음', battleId);
      }
    } else if (session.sceneType === 'BATTLE' && isBattleMode && battleSession) {
      // 전투 중 세션 업데이트 (전투 기록 등)
      setBattleSession(session);
    }
  }, [session.sceneType, session.updatedAt, isBattleMode, battleSession, completedBattles]);
  
  // 상점 모드 감지 및 관리
  useEffect(() => {
    if (session.sceneType === 'SHOP' && !isShopMode) {
      console.log('🏪 상점 모드 시작');
      setIsShopMode(true);
      setShopSession(session);
    } else if (session.sceneType === 'SHOP' && isShopMode && shopSession) {
      // 상점 중 세션 업데이트 (아이템 변경 등)
      setShopSession(session);
    } else if (session.sceneType !== 'SHOP' && isShopMode) {
      // 상점이 아닌 씬타입으로 변경되면 상점 모드 자동 해제
      console.log('🚪 상점 모드 자동 해제 - sceneType:', session.sceneType);
      setIsShopMode(false);
      setShopSession(null);
    }
  }, [session.sceneType, session.updatedAt, isShopMode, shopSession]);
  
  // 히스토리 생성 성공 시 결과 모달 표시
  useEffect(() => {
    if (historyMutation.isSuccess && historyMutation.data) {
      console.log('🎉 히스토리 생성 완료 - 결과 모달 표시');
      setShowHistoryResult(true);
    }
  }, [historyMutation.isSuccess, historyMutation.data]);
  
  // GameSessionData를 ChatMessage로 변환하는 함수
  const convertToChatMessages = (sessionData: GameSessionData): ChatMessage[] => {
    const messages: ChatMessage[] = [];
    const timestamp = new Date().toISOString();
    const stepId = `${sessionData.progress}-${sessionData.updatedAt}`;
    
    // 스토리 컨텐츠를 시스템 메시지로 추가
    const storyContent = (sessionData as any).historyInfo?.story || sessionData.background;
    if (storyContent && storyContent.trim()) {
      console.log('📝 convertToChatMessages - 스토리 추가:', {
        stepId,
        location: sessionData.location,
        contentPreview: storyContent.slice(0, 100) + '...',
        hasHistoryInfo: !!(sessionData as any).historyInfo?.story,
        hasBackground: !!sessionData.background
      });
      
      messages.push({
        id: `story-${stepId}`,
        type: 'story' as const,
        content: storyContent,
        timestamp,
        data: {
          location: sessionData.location
        }
      });
    }
    
    // 선택지가 있다면 선택지 메시지 추가
    if (sessionData.sceneType === 'CHOICE' && sessionData.choiceInfo && sessionData.choiceInfo.length > 0) {
      messages.push({
        id: `choice-${stepId}`,
        type: 'choice' as const,
        content: '선택지를 골라주세요:',
        timestamp,
        data: {
          choices: sessionData.choiceInfo.map((choice, index) => ({
            id: index.toString(),
            label: choice.detail || `선택지 ${index + 1}`,
            detail: choice.detail,
            successRate: choice.probability || 0,
            statType: choice.stats || 'NONE'
          }))
        }
      });
    }
    
    // 상점은 독립적인 ShopView에서 처리하므로 채팅 메시지에는 추가하지 않음
    
    // 보상이 있다면 보상 메시지 추가
    if (sessionData.rewardInfo && sessionData.sceneType === 'DONE') {
      const rewards = [];
      if (sessionData.rewardInfo.rewardLife !== 0 && sessionData.rewardInfo.rewardLife != null) {
        rewards.push({
          type: '생명력',
          value: sessionData.rewardInfo.rewardLife
        });
      }
      if (sessionData.rewardInfo.rewardGold !== 0 && sessionData.rewardInfo.rewardGold != null) {
        rewards.push({
          type: '골드',
          value: sessionData.rewardInfo.rewardGold
        });
      }
      if (sessionData.rewardInfo.gainedItemNames && sessionData.rewardInfo.gainedItemNames.length > 0) {
        rewards.push({
          type: '아이템',
          value: sessionData.rewardInfo.gainedItemNames.join(', ')
        });
      }
      
      if (rewards.length > 0) {
        messages.push({
          id: `reward-${stepId}`,
          type: 'reward' as const,
          content: '보상 결과',
          timestamp,
          data: { rewards }
        });
      }
    }
    
    return messages;
  };
  
  // 세션 데이터가 변경될 때마다 채팅 메시지 누적 업데이트
  useEffect(() => {
    // 전투 모드나 상점 모드일 때는 자동 메시지 추가 하지 않음
    if (isBattleMode || isShopMode) {
      console.log('전투/상점 모드 - 자동 메시지 추가 건너뛰기');
      return;
    }
    
    const newMessages = convertToChatMessages(session);
    
    // 새로운 메시지가 있는지 확인해서 추가만 하기
    setChatMessages(prevMessages => {
      // 이미 있는 메시지 ID들을 추출
      const existingIds = new Set(prevMessages.map(msg => msg.id));
      
      // 새로운 메시지만 필터링
      const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg.id));
      
      // 중복 내용 체크 (같은 내용과 타입의 메시지가 이미 있는지)
      const filteredMessages = uniqueNewMessages.filter(newMsg => {
        // 스토리 메시지 중복 체크
        if (newMsg.type === 'story') {
          return !prevMessages.some(existingMsg => 
            existingMsg.type === 'story' && 
            existingMsg.content === newMsg.content &&
            existingMsg.data?.location === newMsg.data?.location
          );
        }
        
        // 보상 메시지 중복 체크
        if (newMsg.type === 'reward') {
          return !prevMessages.some(existingMsg => 
            existingMsg.type === 'reward' && 
            existingMsg.content === newMsg.content &&
            JSON.stringify(existingMsg.data?.rewards) === JSON.stringify(newMsg.data?.rewards)
          );
        }
        
        // 선택지 메시지 중복 체크 (같은 위치와 같은 선택지 내용)
        if (newMsg.type === 'choice') {
          return !prevMessages.some(existingMsg => 
            existingMsg.type === 'choice' &&
            existingMsg.data?.location === newMsg.data?.location &&
            JSON.stringify(existingMsg.data?.choices) === JSON.stringify(newMsg.data?.choices)
          );
        }
        
        return true;
      });
      
      if (filteredMessages.length > 0) {
        console.log('새로운 메시지 추가:', filteredMessages.length, '개', 
          filteredMessages.map(m => ({ type: m.type, content: m.content.slice(0, 50) + '...' })));
      } else if (uniqueNewMessages.length > 0) {
        console.log('중복 메시지 감지 - 추가되지 않음:', uniqueNewMessages.length, '개',
          uniqueNewMessages.map(m => ({ type: m.type, content: m.content.slice(0, 50) + '...' })));
      }
      
      // 기존 메시지 + 새로운 메시지
      return [...prevMessages, ...filteredMessages];
    });
  }, [session.updatedAt, session.sceneType, session.background, (session as any).historyInfo?.story, isBattleMode, isShopMode]);
  
  // 사용자 선택 처리
  const handleChoiceSelect = (choiceIndex: number) => {
    const timestamp = new Date().toISOString();
    
    // 사용자 선택을 채팅에 추가
    const choiceDetail = session.choiceInfo?.[choiceIndex]?.detail || `선택지 ${choiceIndex + 1}`;
    setChatMessages(prev => [...prev, {
      id: `user-choice-${timestamp}`,
      type: 'user-choice' as const,
      content: choiceDetail,
      timestamp,
    }]);
    
    // 실제 선택 API 호출
    choiceMutation.mutate(choiceIndex.toString());
  };
  
  // 사용자 프롬프트 처리
  const handlePromptSubmit = (prompt: string) => {
    const timestamp = new Date().toISOString();
    
    // 사용자 입력을 채팅에 추가
    setChatMessages(prev => [...prev, {
      id: `user-prompt-${timestamp}`,
      type: 'user-prompt' as const,
      content: prompt,
      timestamp,
    }]);
    
    // 실제 프롬프트 API 호출
    promptMutation.mutate(prompt);
  };
  
  // 상점 아이템 구매 처리
  const handleShopBuy = (shopItemId: string) => {
    const timestamp = new Date().toISOString();
    
    // 구매하려는 아이템 찾기
    const shopTable = session.shopTable || [];
    const item = shopTable.find((item: any) => item.shopItemId === shopItemId);
    
    if (item) {
      // 사용자 구매 행동을 채팅에 추가
      setChatMessages(prev => [...prev, {
        id: `user-buy-${timestamp}`,
        type: 'shop-buy' as const,
        content: `${item.name} 구매 (${item.price}G)`,
        timestamp,
      }]);
      
      // 실제 구매 API 호출 (shopItemId를 그대로 사용)
      if (buyItemMutation) {
        buyItemMutation.mutate(shopItemId);
      }
    }
  };
  
  // 상점 아이템 판매 처리
  const handleShopSell = (inventoryItemId: string) => {
    const timestamp = new Date().toISOString();
    
    // 판매하려는 아이템 찾기
    const item = session.inventory.find(item => item.itemDefId === inventoryItemId);
    
    if (item) {
      const sellPrice = Math.floor((item.price || 0) * 0.5);
      
      // 사용자 판매 행동을 채팅에 추가
      setChatMessages(prev => [...prev, {
        id: `user-sell-${timestamp}`,
        type: 'shop-sell' as const,
        content: `${item.name} 판매 (${sellPrice}G)`,
        timestamp,
      }]);
      
      // 실제 판매 API 호출
      if (sellItemMutation) {
        sellItemMutation.mutate(inventoryItemId);
      }
    }
  };
  
  // 상점 나가기 처리
  const handleLeaveShop = () => {
    console.log('🚪 상점 나가기 - 상점 모드 해제 후 진행');
    setIsShopMode(false);
    setShopSession(null);
    promptMutation.mutate('상점을 나간다');
  };
  
  // 상점 주인과 싸우기 처리
  const handleFightShopkeeper = () => {
    console.log('⚔️ 상점 주인과 싸우기');
    setIsShopMode(false);
    setShopSession(null);
    promptMutation.mutate('상점 주인과 싸운다');
  };
  
  // 상점 주인과 대화하기 처리
  const handleTalkToShopkeeper = () => {
    console.log('💬 상점 주인과 대화하기');
    setIsShopMode(false);
    setShopSession(null);
    promptMutation.mutate('상점 주인과 대화한다');
  };
  
  // 상점에서 사용자 정의 액션 처리
  const handleShopCustomAction = (action: string) => {
    console.log('🎭 상점 사용자 정의 액션:', action);
    setIsShopMode(false);
    setShopSession(null);
    promptMutation.mutate(action);
  };
  
  // 스토리 데이터 구성 - 현재 상황에 맞게 내용 업데이트
  const storyData = {
    title: session.location || '미지의 장소',
    body: (session as any).historyInfo?.story || session.background || '이야기가 시작됩니다...',
    imageUrl: undefined, // 이미지 URL이 있다면 사용
    progress: session.stageSize ? (session.progress / session.stageSize) : 0,
  };
  
  // 디버깅용 로깅
  console.log('🎮 GameSessionView 렌더링:', {
    sceneType: session.sceneType,
    location: session.location,
    progress: `${session.progress}/${session.stageSize}`,
    hasChoices: session.choiceInfo?.length || 0,
    hasHistory: !!(session as any).historyInfo?.story,
    playerLife: session.playerInfo?.life,
    isPlayerDead
  });

  const choices = (Array.isArray(session.choiceInfo) ? session.choiceInfo : []).map((choice, index) => ({
    id: index.toString(),
    label: choice.detail || '선택지',
    successRate: choice.probability || 0,
    statType: (choice.stats || 'NONE').toLowerCase() as any,
  }));

  // 로그는 임시로 빈 배열로 설정 (추후 구현 예정)
  const logs = (Array.isArray(session.battleStory) ? session.battleStory : []).map((battle, index) => ({
    id: index.toString(),
    type: 'SYSTEM' as const,
    text: battle.turnInfo || '전투 내역',
    createdAt: new Date().toISOString(),
  }));

  // 플레이어가 사망했을 때 게임 오버 화면 표시
  if (isPlayerDead) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10 text-white">
        <div className="flex justify-center">
          <div className="rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-900/20 to-red-950/30 p-8 text-center max-w-2xl">
            <div className="mb-6">
              <div className="text-6xl mb-4">💀</div>
              <h1 className="text-3xl font-bold text-red-400 mb-2">게임 오버</h1>
              <p className="text-lg text-gray-300">플레이어가 사망했습니다.</p>
            </div>
            
            <div className="bg-[#1e1e24] rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">최종 상태</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">캐릭터명:</span>
                  <p className="text-white font-medium">{session.playerInfo?.name || '알 수 없음'}</p>
                </div>
                <div>
                  <span className="text-gray-400">진행도:</span>
                  <p className="text-white font-medium">{session.progress}/{session.stageSize}</p>
                </div>
                <div>
                  <span className="text-gray-400">위치:</span>
                  <p className="text-white font-medium">{session.location || '미지의 장소'}</p>
                </div>
                <div>
                  <span className="text-gray-400">골드:</span>
                  <p className="text-yellow-400 font-medium">{session.playerInfo?.gold || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {historyMutation.isSuccess ? (
                <div className="text-center">
                  <div className="text-green-400 text-lg mb-4">✅ 게임 결과가 저장되었습니다!</div>
                  <p className="text-gray-400 text-sm mb-4">게임 결과를 확인하거나 게임 목록으로 이동하세요</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowHistoryResult(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
                    >
                      게임 결과 확인하기
                    </button>
                    <button
                      onClick={onGameOver}
                      className="w-full bg-green-600 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
                    >
                      게임 목록으로 돌아가기
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      console.log('🏁 게임 종료 - 히스토리 생성 시작');
                      historyMutation.mutate(gameId);
                    }}
                    disabled={historyMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-40 hover:scale-105"
                  >
                    {historyMutation.isPending ? '히스토리 생성 중...' : '게임 결과 저장'}
                  </button>
                  
                  <button
                    onClick={onGameOver}
                    className="w-full bg-gray-600 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-500"
                  >
                    게임 목록으로 돌아가기
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 전투 모드일 때는 다른 레이아웃 사용 (isBattleMode 상태 기반)
  if (isBattleMode && battleSession) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10 text-white sm:flex-row">
        <PlayerSidebar 
          playerInfo={battleSession.playerInfo} 
          inventory={battleSession.inventory}
          onUseItem={(itemId) => useItemMutation?.mutate(itemId)}
          onDropItem={(itemId) => dropItemMutation?.mutate(itemId)}
          onToggleEquipItem={(itemId) => toggleEquipItemMutation?.mutate(itemId)}
          isProcessing={useItemMutation?.isPending || dropItemMutation?.isPending || toggleEquipItemMutation?.isPending}
        />
        <div className="flex w-full flex-1 flex-col">
          <BattleView 
            session={battleSession}
            onAction={(action) => {
              // 전투 액션 처리 - 로컬에서만 처리, API 호출 없음
              console.log('⚔️ 전투 액션 실행:', action, '- 로컬 처리만');
              // promptMutation을 호출하지 않으므로 isPending 상태가 변경되지 않음
            }}
            isProcessing={false}
            onNextStep={() => {
              // 전투 완료 후 다음 단계로 진행 - 전투 모드 해제
              console.log('🎯 전투 완료 - 전투 모드 해제하고 다음 단계로 진행');
              
              // 전투 완료 처리
              const battleId = `${session.progress}-${session.location}-${session.updatedAt}`;
              
              // 이미 처리된 전투인지 확인
              if (completedBattles.has(battleId)) {
                console.log('이미 처리된 전투 - 중복 방지');
                return;
              }
              
              // 전투 완료 목록에 추가
              setCompletedBattles(prev => new Set([...prev, battleId]));
              
              // 전투 모드 해제
              setIsBattleMode(false);
              setBattleSession(null);
              
              // 전투 보상과 다음 선택지를 채팅 타임라인에 추가
              const timestamp = new Date().toISOString();
              const uniqueId = `${Date.now()}-${Math.random()}`;
              
              const newMessages = [];
              
              // 중복 방지를 위한 메시지 체크 및 추가
              setChatMessages(prev => {
                // 이미 전투 완료 메시지가 있는지 확인 (위치와 내용 기반)
                const hasBattleCompleteMessage = prev.some(msg => 
                  msg.content.includes('⚔️ 전투가 완료되었습니다!') &&
                  msg.data?.location === session.location
                );
                
                if (!hasBattleCompleteMessage) {
                  const newMessages: ChatMessage[] = [];
                  
                  // 전투 완료 메시지 추가
                  newMessages.push({
                    id: `battle-end-${uniqueId}`,
                    type: 'story' as const,
                    content: `⚔️ 전투가 완료되었습니다!\n\n${session.background}`,
                    timestamp,
                    data: { location: session.location }
                  });
                  
                  // 보상 메시지 추가 (rewardInfo가 있는 경우)
                  const rewardGold = session.rewardInfo?.rewardGold ?? 0;
                  if (rewardGold > 0) {
                    newMessages.push({
                      id: `battle-reward-${uniqueId}`,
                      type: 'reward' as const,
                      content: '전투 보상',
                      timestamp,
                      data: { 
                        rewards: [
                          { type: '골드', value: rewardGold }
                        ]
                      }
                    });
                  }
                  
                  console.log('전투 완료 메시지 추가:', newMessages.length, '개');
                  return [...prev, ...newMessages];
                } else {
                  console.log('이미 전투 완료 메시지가 있음 - 중복 방지');
                  return prev;
                }
              });
              
              // 전투 완료 후 잠시 대기 후 다음 단계로 진행하기 위해 progress API 호출
              setTimeout(() => {
                console.log('📡 전투 완료 후 progress API 호출 (1초 후)');
                promptMutation.mutate('');
              }, 1000);
            }}
          />
        </div>
      </div>
    );
  }

  // 상점 모드일 때는 상점 전용 레이아웃 사용
  if (isShopMode && shopSession) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10 text-white sm:flex-row">
        <PlayerSidebar 
          playerInfo={shopSession.playerInfo} 
          inventory={shopSession.inventory}
          onUseItem={(itemId) => useItemMutation?.mutate(itemId)}
          onDropItem={(itemId) => dropItemMutation?.mutate(itemId)}
          onToggleEquipItem={(itemId) => toggleEquipItemMutation?.mutate(itemId)}
          isProcessing={useItemMutation?.isPending || dropItemMutation?.isPending || toggleEquipItemMutation?.isPending}
        />
        <div className="flex w-full flex-1 flex-col rounded-3xl border border-[#2a2a32] bg-[#17171c] overflow-hidden">
          <ShopView 
            session={shopSession}
            onBuyItem={handleShopBuy}
            onSellItem={handleShopSell}
            onLeaveShop={handleLeaveShop}
            onFightShopkeeper={handleFightShopkeeper}
            onTalkToShopkeeper={handleTalkToShopkeeper}
            onCustomAction={handleShopCustomAction}
            isProcessing={promptMutation.isPending || (buyItemMutation?.isPending ?? false) || (sellItemMutation?.isPending ?? false)}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10 text-white sm:flex-row h-[calc(100vh-80px)]">
        <PlayerSidebar 
          playerInfo={session.playerInfo} 
          inventory={session.inventory}
          onUseItem={(itemId) => useItemMutation?.mutate(itemId)}
          onDropItem={(itemId) => dropItemMutation?.mutate(itemId)}
          onToggleEquipItem={(itemId) => toggleEquipItemMutation?.mutate(itemId)}
          isProcessing={useItemMutation?.isPending || dropItemMutation?.isPending || toggleEquipItemMutation?.isPending}
        />
        <div className="flex w-full flex-1 flex-col h-full rounded-3xl border border-[#2a2a32] bg-[#17171c] overflow-hidden">
          <ChatTimeline
            messages={chatMessages}
            currentSession={session}
            onChoiceSelect={handleChoiceSelect}
            onPromptSubmit={handlePromptSubmit}
            onShopBuy={handleShopBuy}
            onShopSell={handleShopSell}
            isProcessing={choiceMutation.isPending || promptMutation.isPending || (buyItemMutation?.isPending ?? false) || (sellItemMutation?.isPending ?? false)}
          />
          
          {/* DONE 상태일 때 다음 단계 버튼을 채팅 하단에 표시 */}
          {session.sceneType === 'DONE' && (
            <div className="border-t border-[#2a2a32] p-4">
              <div className="text-center">
                {isPlayerDead || session.progress >= (session.stageSize - 1) ? (
                  <button
                    onClick={() => {
                      console.log('🏁 게임 종료 - 히스토리 생성 시작 (progress >= stageSize-1 또는 플레이어 사망)');
                      historyMutation.mutate(gameId);
                    }}
                    disabled={historyMutation.isPending}
                    className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-40 hover:scale-105"
                  >
                    {historyMutation.isPending ? '게임 종료 중...' : '게임 종료'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      console.log('💆 다음 단계 버튼 클릭 - progress API 호출');
                      promptMutation.mutate('');
                    }}
                    disabled={promptMutation.isPending}
                    className="bg-gradient-primary rounded-xl px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-40 hover:scale-105"
                  >
                    {promptMutation.isPending ? '진행 중...' : '다음 단계로 진행'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 히스토리 결과 모달 */}
      {showHistoryResult && historyMutation.data && (
        <GameHistoryResult
          historyData={historyMutation.data}
          onClose={() => {
            setShowHistoryResult(false);
            onGameOver();
          }}
        />
      )}
    </>
  );
};

export default GameSessionView;
