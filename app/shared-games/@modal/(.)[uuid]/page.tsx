'use client';

import { useSharedGameDetail } from '@/entities/shared-game/api/use-shared-game-detail.query';
import Modal from '@/shared/ui/modal/modal';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface SharedGameDetailModalProps {
  params: Promise<{ uuid: string }>;
}

const SharedGameDetailModal = ({ params }: SharedGameDetailModalProps) => {
  const router = useRouter();
  const { uuid } = use(params);
  const { sharedGameDetail } = useSharedGameDetail(uuid);
  console.log(sharedGameDetail);

  return (
    <Modal onClose={() => router.back()}>
      <div>게임 {uuid}</div>
    </Modal>
  );
};

export default SharedGameDetailModal;
