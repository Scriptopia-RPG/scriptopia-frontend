import { cn } from '@/shared/utils/styles';

const STEP_LABELS = ['배경 입력', '캐릭터 생성', '아이템 선택', '게임 생성'] as const;

interface StepIndicatorProps {
  current: number;
}

const StepIndicator = ({ current }: StepIndicatorProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-6 py-8 text-sm text-gray-500 sm:gap-12">
      {STEP_LABELS.map((label, index) => {
        const isActive = index === current;
        const isCompleted = index < current;
        return (
          <div key={label} className="flex items-center gap-3">
            <span
              className={cn(
                'inline-flex h-3 w-3 rounded-full border transition-colors',
                isActive || isCompleted
                  ? 'border-transparent bg-primary'
                  : 'border-gray-600 bg-transparent',
              )}
            />
            <span className={cn('hidden sm:inline', isActive ? 'text-white' : 'text-gray-500')}>{label}</span>
            {index < STEP_LABELS.length - 1 && (
              <span
                className={cn(
                  'hidden h-px w-16 sm:block sm:w-24',
                  isCompleted ? 'bg-primary' : 'bg-gray-700',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;