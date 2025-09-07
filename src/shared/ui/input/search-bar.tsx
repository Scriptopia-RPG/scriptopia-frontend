import SearchIcon from '@icons/search.svg';
import CloseIcon from '@icons/close.svg';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

const SearchBar = ({
  value,
  placeholder = '검색어를 입력해 주세요.',
  onChange,
  onClear,
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <SearchIcon className="text-fg absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="검색어 입력"
        className="bg-surface text-fg w-full rounded-full py-2 pr-12 pl-14 placeholder:text-gray-400 focus:outline-none"
      />

      {!!value && (
        <button
          type="button"
          onClick={onClear}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="검색어 지우기"
          className="absolute top-1/2 right-4 -translate-y-1/2"
        >
          <CloseIcon className="text-fg h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
