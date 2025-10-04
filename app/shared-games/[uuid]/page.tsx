'use client';

import { use } from 'react';

import GameDetailModal from '@/entities/shared-game/ui/game-detail/game-detail-modal';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

const Page = ({ params }: PageProps) => {
  const { uuid } = use(params);

  return <GameDetailModal uuid={uuid} />;
};

export default Page;
