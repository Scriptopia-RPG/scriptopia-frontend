'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useTags } from '@/entities/shared-game/api/use-tags.query';

import CloseButton from '@/shared/ui/button/close-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import ResetButton from '@/entities/shared-game/ui/tag/reset-button';
import Button from '@/shared/ui/button/button';

interface TagSelectModalProps {
  isOpen: boolean;
  initialSelected: number[];
  onClose: () => void;
}

const TagSelectModal = ({ isOpen, initialSelected, onClose }: TagSelectModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { tags } = useTags();
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedTagIds(initialSelected);
    }
  }, [isOpen, initialSelected]);

  const handleTagToggle = (id: number) => {
    setSelectedTagIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleApply = () => {
    const next = new URLSearchParams(searchParams.toString());
    if (selectedTagIds.length > 0) {
      next.set('tags', selectedTagIds.join(','));
    } else {
      next.delete('tags');
    }
    router.replace(`${pathname}?${next.toString()}`);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tag-select-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div
        className="bg-bg relative z-40 mx-6 w-full max-w-lg space-y-10 rounded-2xl p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <p id="tag-select-title" className="text-base font-medium select-none sm:text-xl">
            검색할 게임 태그를 선택해 주세요.
          </p>
          <CloseButton onClick={onClose} />
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {tags.map((tag) => (
            <Tag
              key={tag.tagId}
              name={tag.tagName}
              selected={selectedTagIds.includes(tag.tagId)}
              onSelect={() => handleTagToggle(tag.tagId)}
            />
          ))}

          <ResetButton onClick={() => setSelectedTagIds([])} />
        </div>

        <Button onClick={handleApply}>검색하기</Button>
      </div>
    </div>
  );
};

export default TagSelectModal;
