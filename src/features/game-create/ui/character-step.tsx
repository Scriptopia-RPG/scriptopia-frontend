interface CharacterStepProps {
  name: string;
  trait: string;
  onChange: (field: 'name' | 'trait', value: string) => void;
}

const NAME_PLACEHOLDER = '이름을 입력해주세요';

const TRAIT_PLACEHOLDER =
  '캐릭터의 특성을 입력해 주세요.';

const maxNameLength = 20;
const maxTraitLength = 500;

const CharacterStep = ({ name, trait, onChange }: CharacterStepProps) => {
  return (
    <div className="flex flex-col gap-10 text-white">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">캐릭터 생성하기</h1>
        <p className="text-sm text-gray-400 sm:text-base">당신은 누구인가요? 이야기와 함께할 캐릭터의 이름, 특징을 입력해주세요.</p>
      </header>

      <div className="flex flex-col gap-8 text-sm sm:text-base">
        <div className="flex flex-col gap-2">
          <label htmlFor="character-name-step" className="text-sm text-gray-300">
            이름
          </label>
          <input
            id="character-name-step"
            value={name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder={NAME_PLACEHOLDER}
            maxLength={maxNameLength}
            className="w-full rounded-xl border border-gray-700 bg-[#1f1f24] px-4 py-3 text-sm text-gray-100 outline-none focus:border-primary"
          />
          <span className="text-right text-xs text-gray-500">
            {name.length}/{maxNameLength}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="character-trait-step" className="text-sm text-gray-300">
            특징
          </label>
          <textarea
            id="character-trait-step"
            value={trait}
            onChange={(event) => onChange('trait', event.target.value)}
            placeholder={TRAIT_PLACEHOLDER}
            maxLength={maxTraitLength}
            className="h-48 w-full rounded-xl border border-gray-700 bg-[#1f1f24] px-4 py-3 text-sm text-gray-100 outline-none focus:border-primary"
          />
          <span className="text-right text-xs text-gray-500">
            {trait.length}/{maxTraitLength}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterStep;
