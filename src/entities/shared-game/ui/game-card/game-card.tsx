import Image from 'next/image';

import Tag from '@/entities/shared-game/ui/tag/tag';
import type { SharedGame } from '@/entities/shared-game/model/shared-game.type';
import Link from 'next/link';

const GameCard = ({ sharedGameUuid, thumbnail, title, totalPlayed, tags }: SharedGame) => {
  const formatTotalPlayed = (num: number) => {
    if (num < 1000) {
      return String(num);
    } else if (num < 10000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
    } else {
      return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
    }
  };

  return (
    <article className="group cursor-pointer h-full">
      <Link href={`/explore/${sharedGameUuid}`} className="h-full block">
        <div className="relative bg-gradient-to-br from-[#1e1e24] via-[#1a1a20] to-[#16161c] border border-[#2a2a32] rounded-2xl p-4 transition-all duration-500 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col overflow-visible">
          {/* 썸네일 영역 - 고정 비율 */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[#2a2a32] to-[#1e1e24] mb-4 flex-shrink-0 shadow-inner">
            {thumbnail ? (
              <Image
                src={thumbnail}
                fill
                alt={`${title} 썸네일`}
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-4xl text-gray-600">🎮</div>
              </div>
            )}
            
            {/* 플레이 횟수 오버레이 */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-orange-500/30">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-orange-300">👥</span>
                <span className="text-xs text-white font-semibold">{formatTotalPlayed(totalPlayed)}</span>
              </div>
            </div>
          </div>

          {/* 게임 정보 - 플렉스로 공간 분배 */}
          <div className="flex flex-col flex-1">
            {/* 제목 - 고정 높이 영역 */}
            <div className="h-14 mb-3 flex items-start">
              <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-300 group-hover:to-red-300 group-hover:bg-clip-text transition-all duration-300">
                {title}
              </h3>
            </div>
            
            {/* 콘텐츠 영역 - 태그 또는 설명 */}
            <div className="flex-1 mb-3 flex flex-col justify-between min-h-[4rem]">
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.tagId}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#2a2a32] to-[#232329] text-gray-300 text-xs rounded-full border border-[#35353f] hover:border-orange-500/40 hover:bg-gradient-to-r hover:from-[#35353f] hover:to-[#2a2a32] transition-all duration-300 whitespace-nowrap shadow-sm"
                    >
                      {tag.tagName}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span className="px-3 py-1.5 bg-gradient-to-r from-[#2a2a32] to-[#232329] text-orange-400 text-xs rounded-full border border-orange-500/30 shadow-sm font-medium">
                      +{tags.length - 3}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#2a2a32]/50 to-[#232329]/50 rounded-xl border border-[#35353f]/50">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎮</div>
                    <div className="text-xs text-gray-400">새로운 모험</div>
                  </div>
                </div>
              )}
            </div>

          </div>
          {/* 호버 오버레이 */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Link>
    </article>
  );
};

export default GameCard;
