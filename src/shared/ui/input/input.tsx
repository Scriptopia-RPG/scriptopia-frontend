import { ChangeEvent, useId } from 'react';

interface InputProps {
  id?: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className="w-full">
      <label htmlFor={inputId} className="text-fg block text-sm">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="focus:border-primary text-fg mt-2 w-full rounded-lg border border-gray-100 p-2.5 text-sm placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
