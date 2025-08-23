'use client';

import SearchIcon from '@icons/search.svg';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({
  value,
  placeholder = '검색어를 입력해 주세요.',
  onChange,
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <SearchIcon className="text-fg absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-surface text-fg w-full rounded-full py-2 pr-6 pl-16 placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
