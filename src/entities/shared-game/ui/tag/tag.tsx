import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/styles';

import CloseIcon from '@icons/close.svg';

const tagStyles = cva('inline-flex gap-1 items-center rounded-full select-none text-fg', {
  variants: {
    size: {
      sm: 'text-xs sm:px-2 sm:py-1 px-1.5 py-0.5',
      md: 'px-2.5 py-1 sm:px-3 sm:py-2 text-sm cursor-pointer',
    },
    selected: {
      true: 'bg-btn-bg text-btn-text',
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
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={name}
      className={cn(tagStyles({ size, selected }))}
    >
      <span>{name}</span>
      {removable && <CloseIcon aria-hidden className="h-3.5 w-3.5" />}
    </button>
  );
};

export default Tag;
