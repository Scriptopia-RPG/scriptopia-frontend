'use client';

import { MouseEventHandler } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  children?: React.ReactNode;
  label?: string; // 기존 호환성을 위해 label prop도 유지
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: 'primary' | 'danger';
}

const Button = ({ 
  type = 'button', 
  children, 
  label, 
  disabled = false, 
  onClick, 
  className = '', 
  variant = 'primary' 
}: ButtonProps) => {
  const baseClasses = "w-full cursor-pointer rounded-xl px-6 py-2 text-white disabled:opacity-50 transition hover:scale-105 whitespace-nowrap";
  const variantClasses = {
    primary: "bg-gradient-primary disabled:bg-gray-200 disabled:bg-none",
    danger: "bg-red-600 hover:bg-red-500 disabled:bg-gray-400"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children || label}
    </button>
  );
};

export default Button;