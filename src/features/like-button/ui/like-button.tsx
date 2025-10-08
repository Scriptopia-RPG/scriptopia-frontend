'use client';

import { useRouter } from 'next/navigation';

import useAuthStore from '@/entities/auth/model/auth.store';
import { useToggleLike } from '../api/use-toggle-like.mutation';

import ThumbsIcon from '@icons/thumbs-up.svg';
import ThumbsFilledIcon from '@icons/thumbs-up-fill.svg';

interface LikeButtonProps {
  sharedGameUuid: string;
  isLiked?: boolean;
  likeCount: number;
}

const LikeButton = ({ sharedGameUuid, isLiked = false, likeCount }: LikeButtonProps) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const router = useRouter();
  const toggleLike = useToggleLike(sharedGameUuid);

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }

    toggleLike.mutate();
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
