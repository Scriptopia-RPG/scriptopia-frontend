import { cn } from '@/shared/utils/styles';

export interface TabOption<K extends string> {
  key: K;
  label: string;
}

interface TabsProps<K extends string> {
  options: ReadonlyArray<TabOption<K>>;
  current: K;
  onChange: (key: K) => void;
}

const Tabs = <K extends string>({ options, current, onChange }: TabsProps<K>) => {
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
