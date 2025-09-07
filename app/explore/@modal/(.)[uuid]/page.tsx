'use client';

import { use } from 'react';

interface SharedGameDetailModalProps {
  params: Promise<{ uuid: string }>;
}

const SharedGameDetailModal = ({ params }: SharedGameDetailModalProps) => {
  const { uuid } = use(params);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 rounded-2xl bg-white p-6 shadow-xl">모달 uuid: {uuid}</div>
    </div>
  );
};

export default SharedGameDetailModal;
