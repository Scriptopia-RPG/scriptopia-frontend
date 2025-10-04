'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useSharedGameDetail } from '@/entities/shared-game/api/use-shared-game-detail.query';

import Modal from '@/shared/ui/modal/modal';
import CloseButton from '@/shared/ui/button/close-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import PlayIcon from '@icons/play.svg';
import CrownIcon from '@icons/crown.svg';
import LikeButton from '@/features/like-button/ui/like-button';
import Button from '@/shared/ui/button/button';

interface GameDetailModalProps {
  uuid: string;
}

const GameDetailModal = ({ uuid }: GameDetailModalProps) => {
  const router = useRouter();
  const { sharedGameDetail, isLoading } = useSharedGameDetail(uuid);

  if (isLoading || !sharedGameDetail) {
    return <div>불러오는 중...</div>;
  }

  return (
    <Modal onClose={() => router.back()}>
      <header className="bg-bg sticky top-0 z-10 flex items-center justify-between px-6 py-3.5">
        <h2 className="text-lg font-medium">게임 정보</h2>
        <CloseButton onClick={() => router.back()} />
      </header>

      <div className="mb-5 flex flex-col items-stretch">
        <div className="flex justify-center pt-4 pb-7">
          <Image
            src={sharedGameDetail.posterUrl}
            alt="게임 포스터"
            width={200}
            height={300}
            className="shadow- rounded-sm"
            style={{ boxShadow: '4px 6px 20px rgba(0, 0, 0, 0.4)' }}
          />
        </div>

        {/* 본문 */}
        <div className="space-y-4 px-5">
          {/* 게임 제목, 창작자, 태그 */}
          <div className="flex flex-col gap-3 py-2.5">
            <h1 className="text-xl font-medium">{sharedGameDetail.title}</h1>
            <span>@{sharedGameDetail.creator}</span>
            <div className="flex gap-1.5">
              {sharedGameDetail.tags.map((tag) => (
                <Tag key={tag.tagId} name={tag.tagName} />
              ))}
            </div>
          </div>

          {/* 플레이 수, 좋아요, 최고 점수 */}
          <div className="flex justify-between border-t border-b border-gray-200 px-7 py-4 sm:px-11">
            <div className="flex flex-1 items-center justify-start gap-2.5">
              <PlayIcon className="size-6" />
              <span className="text-sm">{sharedGameDetail.playCount}</span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <LikeButton
                isLiked={sharedGameDetail.isLiked}
                likeCount={sharedGameDetail.likeCount}
              />
            </div>
            <div className="flex flex-1 items-center justify-end gap-2.5">
              <CrownIcon className="size-6" />
              <span className="text-sm">{sharedGameDetail.topScores[0].score}</span>
            </div>
          </div>

          <section className="space-y-2.5 py-2.5">
            <h3 className="font-medium">시놉시스</h3>
            <p className="bg-surface-subtle rounded-xl px-4 py-3.5">
              {sharedGameDetail.backgroundStory}
            </p>
          </section>

          <section className="space-y-2.5 py-2.5">
            <h3 className="font-medium">랭킹</h3>
            <ul className="bg-surface-subtle rounded-xl px-4">
              {sharedGameDetail.topScores.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-gray-100 px-2.5 py-3 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-medium">{i + 1}</span>
                    <Image
                      src={s.profileUrl}
                      width={32}
                      height={32}
                      alt="프로필"
                      className="rounded-sm border border-gray-200"
                    />
                    <span>{s.nickname}</span>
                  </div>
                  <span className="text-sm">{s.score}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="bg-bg sticky bottom-0 z-10 flex border-t border-gray-100 px-4 py-3">
        <Button label="게임 플레이" />
      </div>
    </Modal>
  );
};

export default GameDetailModal;
