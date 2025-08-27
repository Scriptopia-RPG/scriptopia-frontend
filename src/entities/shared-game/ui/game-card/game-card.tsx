import Image from 'next/image';
import Tag from '../tag/tag';

interface GameCardProps {
  thumbnail: string;
  title: string;
  tags: string[];
}

const GameCard = ({ thumbnail, title, tags }: GameCardProps) => {
  return (
    <div className="w-44">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 shadow-[0_0_2px_0_rgba(255,255,255,0.8)]">
        {thumbnail && (
          <Image src={thumbnail} fill alt={title} sizes="176px" className="object-cover" />
        )}
      </div>
      <div className="space-y-3">
        <p className="text-fg truncate text-lg font-medium">{title}</p>
        <div className="flex gap-2.5 overflow-x-auto whitespace-nowrap">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
