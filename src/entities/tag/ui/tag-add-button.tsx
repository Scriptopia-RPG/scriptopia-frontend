import PlusIcon from '@icons/plus.svg';

interface TagAddButtonProps {
  onClick: () => void;
}

const TagAddButton = ({ onClick }: TagAddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-surface inline-flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-2 text-base select-none"
    >
      <span>태그</span>
      <PlusIcon className="h-4 w-4" />
    </button>
  );
};

export default TagAddButton;
