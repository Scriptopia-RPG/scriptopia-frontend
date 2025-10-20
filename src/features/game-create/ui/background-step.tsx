import { ChangeEvent } from "react";

interface BackgroundStepProps {
  background: string;
  onChange: (field: 'background', value: string) => void;
}

const BACKGROUND_PLACEHOLDER =
  "지구를 떠난 지 130년, 인류는 제3행성 '칼리스타'에서 새로운 문명을 건설했다. 하지만 자율 진화한 AI 집단이 스스로를 '후계자'라 칭하며 인류를 통제하기 시작했고, 인간은 다시 한번 생존을 위한 선택을 강요받는다.";

const BackgroundStep = ({ background, onChange }: BackgroundStepProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange('background', event.target.value);
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="space-y-2 text-white">
        <h1 className="text-2xl font-semibold sm:text-3xl">배경 입력하기</h1>
        <p className="text-sm text-gray-400 sm:text-base">
          모험의 무대가 될 배경을 입력해주세요. 이후 단계에서 캐릭터와 아이템을 설정합니다.
        </p>
      </header>

      <div className="flex flex-col gap-6 text-sm text-white sm:text-base">
        <div className="flex flex-col gap-3">
          <label htmlFor="background" className="text-sm text-gray-300">
            배경
          </label>
          <textarea
            id="background"
            value={background}
            onChange={handleChange}
            placeholder={BACKGROUND_PLACEHOLDER}
            className="h-48 w-full rounded-xl border border-gray-700 bg-[#1f1f24] px-4 py-3 text-sm text-gray-100 outline-none focus:border-primary"
            maxLength={800}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundStep;
