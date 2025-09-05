import Image from 'next/image';

import Tag from '@/entities/shared-game/ui/tag/tag';
import type { Tag as TagType } from '@/entities/shared-game/model/shared-game.type';

interface GameCardProps {
  thumbnail: string;
  title: string;
  tags: TagType[];
}

const GameCard = ({ thumbnail, title, tags }: GameCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 shadow-[0_0_2px_0_rgba(255,255,255,0.8)]">
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
      <div className="space-y-2">
        <p className="text-fg truncate text-lg font-medium">{title}</p>
        <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap">
          {tags.map((tag) => (
            <Tag key={tag.tagId} name={tag.tagName} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
