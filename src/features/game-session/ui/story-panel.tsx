import Image from 'next/image';

import type { StoryContent } from '@/features/game-session/model/types';

interface StoryPanelProps {
  story: StoryContent;
}

const StoryPanel = ({ story }: StoryPanelProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#2f2f37] bg-[#1b1b21]">
      <div className="relative h-64 w-full sm:h-80">
        {story.imageUrl ? (
          <Image src={story.imageUrl} alt={story.title} fill className="object-cover" priority />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#202028] text-gray-600">No Image</div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/70 to-transparent p-6 text-white">
          <h2 className="text-2xl font-semibold sm:text-3xl">{story.title}</h2>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#2d2d35]">
          <div className="h-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, story.progress * 100))}%` }} />
        </div>
      </div>
      <div className="space-y-6 p-6 text-sm leading-7 text-gray-200 sm:text-base">
        {story.body.split('\n').map((paragraph: string, idx: number) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default StoryPanel;
