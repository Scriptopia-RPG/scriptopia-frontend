

interface Choice {
  id: string;
  label: string;
  successRate: number;
  statType: string;
}

interface ChoiceListProps {
  choices: Choice[];
  isMutating: boolean;
  onSelect: (choiceId: string) => void;
}

const ChoiceList = ({ choices, isMutating, onSelect }: ChoiceListProps) => {
  if (!choices.length) return null;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => onSelect(choice.id)}
          disabled={isMutating}
          className="group flex flex-col gap-3 rounded-2xl bg-gradient-to-b from-[#2a251d] to-[#1f1510] p-5 text-left text-sm text-white shadow-[0_4px_20px_rgba(255,128,0,0.15)] transition hover:translate-y-[-2px] disabled:opacity-60"
        >
          <span className="text-lg font-semibold">{choice.label}</span>
          <span className="text-xs text-primary/80">
            성공 확률 {choice.successRate}%
          </span>
          <span className="text-xs text-gray-400">
            {choice.statType} 기반
          </span>
        </button>
      ))}
    </div>
  );
};

export default ChoiceList;
