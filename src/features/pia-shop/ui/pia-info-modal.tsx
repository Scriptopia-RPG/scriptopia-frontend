'use client';

import Modal from '@/shared/ui/modal/modal';
import CloseButton from '@/shared/ui/button/close-button';

interface PiaInfoModalProps {
  onClose: () => void;
}

const PiaInfoModal = ({ onClose }: PiaInfoModalProps) => {
  return (
    <Modal ariaLabelledby="pia-info-title" onClose={onClose}>
      <header className="bg-bg sticky top-0 z-10 flex items-center justify-between p-6">
        <h2 className="text-lg font-semibold">피아(PIA)란?</h2>
        <CloseButton onClick={onClose} />
      </header>

      <div className="relative px-6 pb-6">
        <div className="text-fg space-y-6 text-sm">
          <p>
            피아(PIA)는 스크립토피아에서 사용하는 가상 화폐예요. 피아 상점에서 다양한 아이템을
            구매하는 데 사용할 수 있어요.
          </p>
          <div>
            <h3 className="mb-2 font-semibold">피아 획득 방법</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>게임 플레이 완료</li>
              <li>랭킹 달성</li>
              <li>경매장에 아이템 판매</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">피아 사용처</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>피아 상점에서 아이템 구매</li>
              <li>경매장에서 아이템 구매</li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PiaInfoModal;
