import CloseIcon from '@icons/close.svg';

interface CloseButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button type="button" onClick={onClick} aria-label="닫기">
      <CloseIcon className="h-5 w-5 text-gray-400" />
    </button>
  );
};

export default CloseButton;
