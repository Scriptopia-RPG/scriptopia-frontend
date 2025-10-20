import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GameSessionData } from '@/features/game-session/model/types';

export interface ChatMessage {
  id: string;
  type: 'story' | 'choice' | 'user-choice' | 'user-prompt' | 'reward' | 'battle-start' | 'battle-end' | 'shop' | 'shop-buy' | 'shop-sell';
  content: string;
  timestamp: string;
  data?: any;
}

interface ChatTimelineProps {
  messages: ChatMessage[];
  currentSession: GameSessionData;
  onChoiceSelect: (choiceIndex: number) => void;
  onPromptSubmit: (prompt: string) => void;
  onShopBuy?: (shopItemId: string) => void;
  onShopSell?: (inventoryItemId: string) => void;
  isProcessing: boolean;
}

const ChatTimeline = ({
  messages,
  currentSession,
  onChoiceSelect,
  onPromptSubmit,
  onShopBuy,
  onShopSell,
  isProcessing
}: ChatTimelineProps) => {
  const [promptInput, setPromptInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때마다 자동으로 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // 처리 중일 때도 스크롤 유지
  useEffect(() => {
    if (isProcessing && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isProcessing]);

  const renderMessage = (message: ChatMessage, index: number) => {
    switch (message.type) {
      case 'story':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">📖</span>
            </div>
            <div className="flex-1">
              <div className="bg-[#1e1e24] rounded-2xl rounded-tl-sm p-4 border border-[#2a2a32]">
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.data?.location && (
                  <div className="mt-3 text-xs text-gray-400 border-t border-gray-600 pt-2">
                    📍 {message.data.location}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        );

      case 'choice':
        // 현재 세션이 CHOICE 상태이고, 이 메시지가 가장 최근 CHOICE 메시지인지 확인
        const latestChoiceMessage = messages.filter(m => m.type === 'choice').pop();
        const isCurrentChoice = currentSession.sceneType === 'CHOICE' && message.id === latestChoiceMessage?.id;
        
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex gap-3 mb-4 ${!isCurrentChoice ? 'opacity-60' : ''}`}
          >
            <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${isCurrentChoice ? 'from-blue-500 to-purple-500' : 'from-gray-500 to-gray-600'} rounded-full flex items-center justify-center`}>
              <span className="text-white text-sm font-bold">🔀</span>
            </div>
            <div className="flex-1">
              <div className={`${isCurrentChoice ? 'bg-[#1a1a20]' : 'bg-[#1a1a1a]'} rounded-2xl rounded-tl-sm p-4 border ${isCurrentChoice ? 'border-blue-500/30' : 'border-gray-600/30'}`}>
                <p className={`${isCurrentChoice ? 'text-blue-200' : 'text-gray-400'} mb-3 font-medium`}>
                  {isCurrentChoice ? '선택지를 골라주세요:' : '선택이 완료된 이전 선택지:'}
                </p>
                <div className="space-y-2">
                  {message.data?.choices?.map((choice: any, choiceIndex: number) => (
                    <button
                      key={choiceIndex}
                      onClick={() => isCurrentChoice && onChoiceSelect(choiceIndex)}
                      disabled={isProcessing || !isCurrentChoice}
                      className={`w-full text-left p-3 rounded-xl transition-colors border ${
                        isCurrentChoice 
                          ? 'bg-[#2a2a32] hover:bg-[#35353f] border-transparent hover:border-blue-500/30 group' 
                          : 'bg-[#222225] border-gray-600/20 cursor-not-allowed'
                      } disabled:opacity-50`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`font-mono text-sm mt-0.5 ${
                          isCurrentChoice 
                            ? 'text-blue-400 group-hover:text-blue-300' 
                            : 'text-gray-500'
                        }`}>
                          {choiceIndex + 1}.
                        </span>
                        <div className="flex-1">
                          <p className={`transition-colors ${
                            isCurrentChoice 
                              ? 'text-gray-200 group-hover:text-white' 
                              : 'text-gray-500'
                          }`}>
                            {choice.detail || choice.label}
                          </p>
                          {choice.successRate && (
                            <div className="flex items-center gap-2 mt-2 text-xs">
                              <span className="text-gray-500">성공률:</span>
                              <span className={isCurrentChoice ? "text-green-400" : "text-gray-500"}>{choice.successRate}%</span>
                              {choice.statType && choice.statType !== 'NONE' && (
                                <>
                                  <span className="text-gray-500">필요 스탯:</span>
                                  <span className={isCurrentChoice ? "text-yellow-400" : "text-gray-500"}>{choice.statType}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'user-choice':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4 justify-end"
          >
            <div className="flex-1 flex justify-end">
              <div className="max-w-xs">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl rounded-tr-sm p-3">
                  <p className="text-white font-medium">{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 mr-2 text-right">
                  선택함 • {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">👤</span>
            </div>
          </motion.div>
        );

      case 'user-prompt':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4 justify-end"
          >
            <div className="flex-1 flex justify-end">
              <div className="max-w-md">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl rounded-tr-sm p-3">
                  <p className="text-white">{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 mr-2 text-right">
                  입력함 • {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">👤</span>
            </div>
          </motion.div>
        );

      case 'reward':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎁</span>
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl rounded-tl-sm p-4 border border-yellow-500/30">
                <p className="text-yellow-200 mb-2 font-medium">보상 결과</p>
                <div className="space-y-1 text-sm">
                  {message.data?.rewards?.map((reward: any, i: number) => (
                    <p key={i} className={reward.value > 0 ? "text-green-400" : "text-red-400"}>
                      {reward.type} {reward.value > 0 ? '+' : ''}{reward.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'shop':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🏪</span>
            </div>
            <div className="flex-1">
              <div className="bg-[#1a1a20] rounded-2xl rounded-tl-sm p-4 border border-green-500/30">
                <p className="text-green-200 mb-4 font-medium">상점</p>
                <div className="space-y-4">
                  {/* 상점 아이템 목록 */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">구매 가능한 아이템</h4>
                    {message.data?.shopItems?.map((item: any, i: number) => (
                      <div key={i} className="bg-[#2a2a32] rounded-lg p-3 border border-gray-600">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="text-white font-medium text-sm">{item.name}</h5>
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                item.grade === 'COMMON' ? 'bg-gray-500/20 text-gray-300' :
                                item.grade === 'UNCOMMON' ? 'bg-green-500/20 text-green-300' :
                                item.grade === 'RARE' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}>
                                {item.grade}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                            {item.itemEffects && item.itemEffects.length > 0 && (
                              <div className="space-y-1 mb-2">
                                {item.itemEffects.slice(0, 2).map((effect: any, ei: number) => (
                                  <div key={ei} className="text-xs">
                                    <span className="text-blue-300 font-medium">{effect.itemEffectName}:</span>
                                    <span className="text-gray-400 ml-1">{effect.itemEffectDescription}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-yellow-400">💰 {item.price}G</span>
                              {item.mainStat && (
                                <span className="text-purple-300">주 스탯: {item.mainStat}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => onShopBuy?.(item.shopItemId)}
                            disabled={isProcessing || (currentSession.playerInfo.gold < item.price)}
                            className="ml-3 px-3 py-1.5 bg-green-500/20 text-green-300 rounded border border-green-500/30 hover:bg-green-500/30 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            구매
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 판매 가능한 인벤토리 아이템 */}
                  {message.data?.inventoryItems && message.data.inventoryItems.length > 0 && (
                    <div className="space-y-3 border-t border-gray-600 pt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">판매 가능한 아이템</h4>
                      {message.data.inventoryItems.map((item: any, i: number) => (
                        <div key={i} className="bg-[#2a2a32] rounded-lg p-3 border border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="text-white font-medium text-sm">{item.name}</h5>
                                <span className={`text-xs px-1.5 py-0.5 rounded ${
                                  item.grade === 'COMMON' ? 'bg-gray-500/20 text-gray-300' :
                                  item.grade === 'UNCOMMON' ? 'bg-green-500/20 text-green-300' :
                                  item.grade === 'RARE' ? 'bg-blue-500/20 text-blue-300' :
                                  'bg-purple-500/20 text-purple-300'
                                }`}>
                                  {item.grade}
                                </span>
                                {item.equipped && (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    장착중
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-yellow-400">💰 {Math.floor((item.price || 0) * 0.5)}G</span>
                                {item.mainStat && (
                                  <span className="text-purple-300">주 스탯: {item.mainStat}</span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => onShopSell?.(item.itemDefId)}
                              disabled={isProcessing || item.equipped}
                              className="ml-3 px-3 py-1.5 bg-red-500/20 text-red-300 rounded border border-red-500/30 hover:bg-red-500/30 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {item.equipped ? '장착중' : '판매'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 플레이어 골드 정보 */}
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-yellow-400 text-lg">💰</span>
                      <span className="text-white font-medium">보유 골드: {currentSession.playerInfo.gold}G</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'shop-buy':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4 justify-end"
          >
            <div className="flex-1 flex justify-end">
              <div className="max-w-xs">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl rounded-tr-sm p-3">
                  <p className="text-white font-medium">{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 mr-2 text-right">
                  구매함 • {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">👤</span>
            </div>
          </motion.div>
        );

      case 'shop-sell':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4 justify-end"
          >
            <div className="flex-1 flex justify-end">
              <div className="max-w-xs">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl rounded-tr-sm p-3">
                  <p className="text-white font-medium">{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 mr-2 text-right">
                  판매함 • {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">👤</span>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const showPromptInput = currentSession.sceneType === 'CHOICE' || currentSession.sceneType === 'SHOP';

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 메시지 영역 */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-none">
        {messages.map((message, index) => renderMessage(message, index))}
        
        {/* 로딩 중일 때 표시 */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mb-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex-1">
              <div className="bg-[#1e1e24] rounded-2xl rounded-tl-sm p-4 border border-[#2a2a32]">
                <p className="text-gray-400">응답을 기다리는 중...</p>
              </div>
            </div>
          </motion.div>
        )}
        {/* 스크롤 앵커 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 프롬프트 입력 영역 */}
      {showPromptInput && (
        <div className="border-t border-[#2a2a32] p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && promptInput.trim() && !isProcessing) {
                  onPromptSubmit(promptInput.trim());
                  setPromptInput('');
                }
              }}
              placeholder="메시지를 입력하세요..."
              disabled={isProcessing}
              className="flex-1 bg-[#2a2a32] border border-[#35353f] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              onClick={() => {
                if (promptInput.trim() && !isProcessing) {
                  onPromptSubmit(promptInput.trim());
                  setPromptInput('');
                }
              }}
              disabled={!promptInput.trim() || isProcessing}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl px-6 py-3 text-white font-medium transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatTimeline;