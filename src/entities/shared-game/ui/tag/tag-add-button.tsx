import { MouseEventHandler } from 'react';

import PlusIcon from '@icons/plus.svg';

interface TagAddButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TagAddButton = ({ onClick }: TagAddButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-sm ring-1 ring-gray-200 select-none ring-inset sm:px-4 sm:py-2"
    >
      <span>태그</span>
      <PlusIcon aria-hidden className="h-3.5 w-3.5" />
    </button>
  );
};

export default TagAddButton;
