import { FormEvent, useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isMutating: boolean;
}

const PromptInput = ({ onSubmit, isMutating }: PromptInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim() || isMutating) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="직접 행동을 입력하세요."
        className="flex-1 rounded-xl border border-[#2a2a32] bg-[#1b1b21] px-4 py-3 text-sm text-gray-100 outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={!value.trim() || isMutating}
        className="bg-gradient-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-50"
      >
        {isMutating ? '입력 중…' : '입력'}
      </button>
    </form>
  );
};

export default PromptInput;
