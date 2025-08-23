import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/styles';

import CloseIcon from '@icons/close.svg';

const tagStyles = cva('inline-flex gap-2.5 items-center rounded-full select-none text-fg', {
  variants: {
    size: {
      sm: 'text-sm px-2 py-1',
      md: 'px-4 py-2 text-base cursor-pointer',
    },
    selected: {
      true: 'bg-primary',
      false: 'bg-surface',
    },
  },
  defaultVariants: {
    size: 'md',
    selected: false,
  },
});

interface TagProps extends VariantProps<typeof tagStyles> {
  name: string;
  size?: 'sm' | 'md';
  selected?: boolean;
  removable?: boolean;
  onSelect?: (next: boolean) => void;
  onRemove?: () => void;
}

const Tag = ({
  name,
  size = 'md',
  selected = false,
  removable = false,
  onSelect,
  onRemove,
}: TagProps) => {
  if (size === 'sm') {
    return <span className={cn(tagStyles({ size: 'sm' }))}>#{name}</span>;
  }

  const handleClick = () => {
    if (removable) {
      onRemove?.();
    } else {
      onSelect?.(!selected);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={selected}
      className={cn(tagStyles({ size, selected }))}
    >
      <span>#{name}</span>
      {removable && <CloseIcon className="h-4 w-4" />}
    </button>
  );
};

export default Tag;
