'use client';

import { useRouter } from 'next/navigation';

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
      <button
        type="button"
        onClick={handleButtonClick}
        aria-pressed={isLiked}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        className="size-6 cursor-pointer"
      >
        {isLiked ? <ThumbsFilledIcon /> : <ThumbsIcon />}
      </button>
      <span className="text-sm">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
