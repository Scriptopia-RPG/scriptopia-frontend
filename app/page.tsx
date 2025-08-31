'use client';

import { LoginModal } from '@/widgets/login-modal/ui';
import { useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-md bg-orange-500 px-4 py-2 text-white"
      >
        로그인
      </button>

      <LoginModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}