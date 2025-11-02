'use client';

import { useState } from 'react';

import InfoIcon from '@public/icons/info.svg';
import PiaBalance from '@/features/pia-shop/ui/pia-balance';
import PiaInfoModal from '@/features/pia-shop/ui/pia-info-modal';

const PiaShopHeader = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-fg text-2xl font-bold">피아 상점</h1>
          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="피아 정보 보기"
          >
            <InfoIcon className="h-6 w-6" />
          </button>
        </div>
        <PiaBalance />
      </div>
      {showInfoModal && <PiaInfoModal onClose={() => setShowInfoModal(false)} />}
    </>
  );
};

export default PiaShopHeader;
