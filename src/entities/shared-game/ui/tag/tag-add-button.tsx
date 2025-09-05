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
      className="bg-surface inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm select-none"
    >
      <span>태그</span>
      <PlusIcon className="aria-hidden: h-3.5 w-3.5" />
    </button>
  );
};

export default TagAddButton;
