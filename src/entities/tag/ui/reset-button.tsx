import ResetIcon from '@icons/reset.svg';

const ResetButton = () => {
  return (
    <button className="flex items-center justify-center gap-2.5 rounded-full border px-4 py-2">
      초기화
      <ResetIcon className="h-4 w-4" />
    </button>
  );
};

export default ResetButton;
