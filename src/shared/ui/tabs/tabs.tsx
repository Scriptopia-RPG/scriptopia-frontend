import { cn } from '@/shared/utils/styles';

interface TabsProps {
  options: ReadonlyArray<{ key: string; label: string }>;
  current: string;
  onChange: (key: string) => void;
}

const Tabs = ({ options, current, onChange }: TabsProps) => {
  return (
    <ul role="tablist" className="m-0 flex list-none items-center divide-x p-0">
      {options.map(({ key, label }) => (
        <li key={key} role="none" className="flex items-center px-3 first:pl-0 last:pr-0">
          <button
            type="button"
            role="tab"
            aria-selected={current === key}
            onClick={() => onChange(key)}
            className={cn(
              'hover:text-primary cursor-pointer text-sm leading-none',
              current === key ? 'text-primary' : 'text-fg',
            )}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
