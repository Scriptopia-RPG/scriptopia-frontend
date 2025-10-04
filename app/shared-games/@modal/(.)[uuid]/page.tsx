'use client';

import { use } from 'react';

import GameDetailModal from '@/entities/shared-game/ui/game-detail/game-detail-modal';

interface SharedGameDetailModalProps {
  params: Promise<{ uuid: string }>;
}

const SharedGameDetailModal = ({ params }: SharedGameDetailModalProps) => {
  const { uuid } = use(params);

  return <GameDetailModal uuid={uuid} />;
};

export default SharedGameDetailModal;
