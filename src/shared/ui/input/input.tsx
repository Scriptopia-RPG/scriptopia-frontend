import { forwardRef, InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id }, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className="w-full">
      <label htmlFor={inputId} className="text-fg block text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        className="focus:border-primary text-fg mt-2 w-full rounded-lg border border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
