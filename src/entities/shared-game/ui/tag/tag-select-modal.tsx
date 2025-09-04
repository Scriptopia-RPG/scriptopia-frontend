'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTags } from '@/entities/shared-game/model/use-tags.query';

import CloseButton from '@/shared/ui/button/close-button';
import Tag from '@/entities/shared-game/ui/tag/tag';
import ResetButton from '@/entities/shared-game/ui/tag/reset-button';
import Button from '@/shared/ui/button/button';
import { useEffect, useMemo, useState } from 'react';

interface TagSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TagSelectModal = ({ isOpen, onClose }: TagSelectModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { tags } = useTags();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const initialSelected = useMemo(() => {
    const raw = searchParams.get('tags') ?? '';
    const ids = raw
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .map(Number);

    const valid = new Set(tags.map((t) => t.tagId));
    return Array.from(new Set(ids.filter((id) => valid.has(id))));
  }, [searchParams, tags]);

  useEffect(() => {
    if (isOpen) {
      setSelectedIds(initialSelected);
    }
  }, [isOpen, initialSelected]);

  const handleTagToggle = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleApply = () => {
    const next = new URLSearchParams(searchParams.toString());
    if (selectedIds.length) next.set('tags', selectedIds.join(','));
    else next.delete('tags');

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
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div
        className="bg-bg relative z-40 w-full max-w-lg space-y-10 rounded-2xl p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <p className="text-xl font-medium select-none">검색할 게임 태그를 선택해 주세요.</p>
          <CloseButton onClick={onClose} />
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {tags.map((tag) => (
            <Tag
              key={tag.tagId}
              name={tag.tagName}
              selected={selectedIds.includes(tag.tagId)}
              onSelect={() => handleTagToggle(tag.tagId)}
            />
          ))}

          <ResetButton onClick={() => setSelectedIds([])} />
        </div>

        <Button label="검색하기" onClick={handleApply} />
      </div>
    </div>
  );
};

export default TagSelectModal;
