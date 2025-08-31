
'use client';

import { LoginForm } from '@/features/auth/login-form/ui';
import { SocialLoginButtons } from '@/features/auth/social-login/ui';
import { Icon } from '@/shared/ui/Icon';
import { Logo } from '@/shared/ui/Logo';
import { Modal } from '@/shared/ui/Modal';
import Link from 'next/link';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-[480px] rounded-lg bg-white p-8 shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <Icon name="close" className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center space-y-8">
          <Logo />

          <div className="w-full space-y-6">
            <LoginForm />
            <SocialLoginButtons />
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              아직 회원이 아니신가요?{' '}
              <Link href="/signup" className="font-semibold text-orange-500 hover:underline">
                회원가입
              </Link>
            </p>
            <Link href="/forgot-password" className="mt-2 inline-block hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
