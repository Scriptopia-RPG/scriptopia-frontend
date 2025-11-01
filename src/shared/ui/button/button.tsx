'use client';

import { MouseEventHandler } from 'react';
import { cn } from '@/shared/utils/styles';

interface ButtonProps {
  type?: 'button' | 'submit';
  label: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'outline';
  size?: 'auto' | 'full';
  className?: string;
}

const Button = ({
  type = 'button',
  label,
  disabled = false,
  onClick,
  variant = 'primary',
  size = 'full',
  className,
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-gradient-primary text-white disabled:bg-gray-200 disabled:bg-none',
    outline:
      'bg-transparent text-fg border border-gray-200 hover:bg-surface disabled:bg-gray-200 disabled:text-gray-400',
  };

  const sizeClasses = {
    full: 'w-full py-2.5',
    auto: 'px-6 py-3 text-base sm:px-8',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'cursor-pointer rounded-xl transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {label}
    </button>
  );
};

export default Button;
