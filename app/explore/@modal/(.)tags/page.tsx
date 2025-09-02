'use client';

import { useRouter } from 'next/navigation';

import { useTags } from '@/entities/shared-game/model/use-tags.query';

import CloseButton from '@/shared/ui/button/close-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import ResetButton from '@/entities/shared-game/ui/tag/reset-button';

const Modal = () => {
  const router = useRouter();
  const { tags } = useTags();

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div
        className="bg-bg relative z-40 w-full max-w-lg space-y-11 rounded-2xl p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <p className="text-xl">검색할 게임 태그를 선택해 주세요.</p>
          <CloseButton onClick={handleClose} />
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {tags.map((tag) => (
            <Tag key={tag.tagId} name={tag.tagName} />
          ))}
          <ResetButton />
        </div>
      </div>
    </div>
  );
};

export default Modal;
