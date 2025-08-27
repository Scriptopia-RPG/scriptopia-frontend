import ResetIcon from '@icons/reset.svg';

interface ResetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-fg ring-fg flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-2 text-sm ring-1 select-none ring-inset"
    >
      초기화
      <ResetIcon className="h-3.5 w-3.5" />
    </button>
  );
};

export default ResetButton;
