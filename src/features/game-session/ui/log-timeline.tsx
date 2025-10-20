import { useState, useEffect } from 'react';
import type { StoryLog } from '@/features/game-session/model/types';

interface LogTimelineProps {
  logs: StoryLog[];
}

const getLogTypeColor = (type: StoryLog['type']) => {
  switch (type) {
    case 'ACTION':
      return 'bg-blue-500';
    case 'SYSTEM':
      return 'bg-green-400';
    case 'RESULT':
      return 'bg-yellow-500';
    default:
      return 'bg-primary';
  }
};

const getLogTypeLabel = (type: StoryLog['type']) => {
  switch (type) {
    case 'ACTION':
      return '액션';
    case 'SYSTEM':
      return '시스템';
    case 'RESULT':
      return '결과';
    default:
      return '일반';
  }
};

const formatTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  } catch {
    return '';
  }
};

const LogTimeline = ({ logs }: LogTimelineProps) => {
  // 순차적 로그 표시를 위한 상태
  const [visibleLogs, setVisibleLogs] = useState<number>(0);

  // 로그가 변경될 때마다 순차적으로 표시
  useEffect(() => {
    if (logs.length === 0) {
      setVisibleLogs(0);
      return;
    }

    // 이미 모든 로그가 표시되었다면 아무것도 하지 않음
    if (visibleLogs >= logs.length) {
      return;
    }

    // 첫 번째 로그는 즉시 표시
    if (visibleLogs === 0) {
      setVisibleLogs(1);
      return;
    }

    // 나머지 로그들은 1.5초 간격으로 순차적으로 표시
    const timer = setTimeout(() => {
      if (visibleLogs < logs.length) {
        setVisibleLogs(prev => prev + 1);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [logs.length, visibleLogs]);

  // 로그 데이터가 새로 들어올 때 리셋
  useEffect(() => {
    setVisibleLogs(0);
  }, [logs.length]);

  if (!logs.length) {
    return (
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">진행 로그</h3>
        <div className="rounded-2xl border border-[#2a2a32] bg-[#17171c] p-6 text-center text-sm text-gray-500">
          아직 진행된 내용이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">진행 로그</h3>
        <div className="text-xs text-gray-500">
          {visibleLogs} / {logs.length}
        </div>
      </div>
      <div className="max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-[#2a2a32] bg-[#17171c] p-4 text-sm scrollbar-none">
        {logs.slice(0, visibleLogs).map((log, index) => (
          <div 
            key={log.id} 
            className={`group relative flex items-start gap-3 rounded-lg border border-transparent p-2 transition-all duration-500 hover:border-[#35353f] hover:bg-[#1e1e24] ${
              index === visibleLogs - 1 ? 'animate-fadeInUp' : ''
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className={`h-3 w-3 rounded-full ${getLogTypeColor(log.type)} shadow-sm`} />
              {index < visibleLogs - 1 && (
                <div className="h-6 w-px bg-gradient-to-b from-[#35353f] to-transparent" />
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                  log.type === 'ACTION' 
                    ? 'bg-blue-500/20 text-blue-300'
                    : log.type === 'SYSTEM'
                    ? 'bg-green-400/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {getLogTypeLabel(log.type)}
                </span>
                <time className="text-xs text-gray-500">
                  {formatTime(log.createdAt)}
                </time>
              </div>
              <p className="leading-relaxed text-gray-200">
                {log.text}
              </p>
            </div>
          </div>
        ))}
        
        {/* 다음 로그 로딩 표시 */}
        {visibleLogs < logs.length && (
          <div className="group relative flex items-start gap-3 rounded-lg border border-dashed border-gray-600/50 bg-[#1e1e24]/30 p-2">
            <div className="flex flex-col items-center gap-1">
              <div className="h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-xs">다음 로그 로딩 중...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 완료 상태 표시 */}
      {visibleLogs === logs.length && logs.length > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-green-300">모든 로그 로딩 완료</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogTimeline;