import ResetIcon from '@icons/reset.svg';

interface ResetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full border px-4 py-2 select-none"
    >
      초기화
      <ResetIcon className="h-4 w-4" />
    </button>
  );
};

export default ResetButton;
