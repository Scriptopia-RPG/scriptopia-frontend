'use client';

import { LoginModal } from '@/features/auth/login/ui/login-modal';
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
      
      <LoginModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
}