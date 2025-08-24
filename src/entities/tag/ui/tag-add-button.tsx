import PlusIcon from '@icons/plus.svg';

interface TagAddButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TagAddButton = ({ onClick }: TagAddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-surface inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm select-none"
    >
      <span>태그</span>
      <PlusIcon className="h-3.5 w-3.5" />
    </button>
  );
};

export default TagAddButton;
