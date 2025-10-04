'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useSharedGameDetail } from '@/entities/shared-game/api/use-shared-game-detail.query';

import Modal from '@/shared/ui/modal/modal';
import CloseButton from '@/shared/ui/button/close-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import PlayIcon from '@icons/play.svg';
import CrownIcon from '@icons/crown.svg';

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
      <header className="sticky flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-medium">게임 정보</h2>
        <CloseButton onClick={() => router.back()} />
      </header>

      <div className="flex flex-col items-stretch">
        <div className="flex justify-center pt-3 pb-7">
          <Image
            src={sharedGameDetail.posterUrl}
            alt="게임 포스터"
            width={200}
            height={300}
            className="rounded-sm"
            style={{ boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.5)' }}
          />
        </div>

        {/* 본문 */}
        <div className="space-y-4 px-5">
          <div className="flex flex-col gap-3 py-2.5">
            <h1 className="text-xl font-medium">{sharedGameDetail.title}</h1>
            <span>@{sharedGameDetail.creator}</span>
            <div className="flex gap-1.5">
              {sharedGameDetail.tags.map((tag) => (
                <Tag key={tag.tagId} name={tag.tagName} />
              ))}
            </div>
          </div>

          <div></div>

          <section className="space-y-2.5 py-2.5">
            <h3 className="font-medium">시놉시스</h3>
            <p className="rounded-xl bg-gray-50 px-4 py-3.5">{sharedGameDetail.backgroundStory}</p>
          </section>

          <section className="space-y-2.5 py-2.5">
            <h3 className="font-medium">랭킹</h3>
            <ul className="rounded-xl bg-gray-50 px-4">
              {sharedGameDetail.topScores.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-gray-100 px-2.5 py-3"
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
    </Modal>
  );
};

export default GameDetailModal;
