'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/utils/styles';

import ThumbsIcon from '@icons/thumbs-up.svg';
import ThumbsFilledIcon from '@icons/thumbs-up-fill.svg';

interface LikeButtonProps {
  isLiked?: boolean;
  likeCount: number;
}

const LikeButton = ({ isLiked = false, likeCount }: LikeButtonProps) => {
  const isLoggedIn = false;
  const router = useRouter();

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }

    // 좋아요 요청
  };

  return (
    <div className="flex items-center gap-2.5">
      <button type="button" onClick={handleButtonClick} className={cn()}>
        {isLiked ? <ThumbsFilledIcon /> : <ThumbsIcon />}
      </button>
      <span className="text-sm">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
