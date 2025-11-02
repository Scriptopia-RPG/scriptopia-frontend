'use client';

import { usePiaBalance } from '@/entities/user/api/use-pia-balance.query';

const PiaBalance = () => {
  const { data, isLoading } = usePiaBalance();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-fg text-sm">피아:</span>
        <span className="text-fg text-sm font-semibold">불러오는 중...</span>
      </div>
    );
  }

  const piaAmount = data?.pia ?? 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-fg text-sm">피아:</span>
      <span className="text-fg text-sm font-semibold">{piaAmount.toLocaleString('ko-KR')}</span>
    </div>
  );
};

export default PiaBalance;
