'use client';

import { MouseEventHandler } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  label: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type = 'button', label, disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-gradient-primary w-full cursor-pointer rounded-xl py-2.5 text-white disabled:bg-gray-200 disabled:bg-none"
    >
      {label}
    </button>
  );
};

export default Button;
