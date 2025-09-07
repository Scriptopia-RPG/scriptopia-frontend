import { MouseEventHandler } from 'react';

import ResetIcon from '@icons/reset.svg';

interface ResetButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-fg flex cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 py-1 text-sm ring-1 ring-gray-200 select-none ring-inset sm:px-4 sm:py-2"
    >
      초기화
      <ResetIcon aria-hidden className="h-3.5 w-3.5" />
    </button>
  );
};

export default ResetButton;
