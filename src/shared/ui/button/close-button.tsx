import { MouseEventHandler } from 'react';

import CloseIcon from '@icons/close.svg';

interface CloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button type="button" onClick={onClick} aria-label="닫기" className="cursor-pointer">
      <CloseIcon className="h-5 w-5 text-gray-400" />
    </button>
  );
};

export default CloseButton;
