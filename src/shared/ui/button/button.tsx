'use client';

import { MouseEventHandler } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type = 'button', label, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-gradient-primary w-full cursor-pointer rounded-xl py-2.5 text-white"
    >
      {label}
    </button>
  );
};

export default Button;
