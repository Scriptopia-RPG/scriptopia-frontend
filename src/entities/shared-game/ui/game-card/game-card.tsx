import Image from 'next/image';

import Tag from '@/entities/shared-game/ui/tag/tag';
import type { SharedGame } from '@/entities/shared-game/model/shared-game.type';
import Link from 'next/link';

const GameCard = ({ sharedGameUuid, thumbnail, title, totalPlayed, tags }: SharedGame) => {
  console.log(thumbnail);
  return (
    <Link href={`/explore/${sharedGameUuid}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-gray-100 shadow-[0_0_2px_0_rgba(255,255,255,0.8)]">
        {thumbnail && (
          <Image
            src={thumbnail}
            fill
            alt={title}
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition duration-200 group-hover:brightness-[0.6]"
          />
        )}
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-fg truncate text-sm font-medium sm:text-lg">{title}</p>
        <div>
          <p className="text-xs text-gray-500">{totalPlayed}</p>
          <div className="scrollbar-none mt-3 flex hidden gap-1.5 overflow-x-auto whitespace-nowrap sm:flex">
            {tags.map((tag) => (
              <Tag key={tag.tagId} name={tag.tagName} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
