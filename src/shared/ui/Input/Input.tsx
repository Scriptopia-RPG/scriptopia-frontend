
import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, className, ...props }, ref) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={twMerge(
          'w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500',
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
