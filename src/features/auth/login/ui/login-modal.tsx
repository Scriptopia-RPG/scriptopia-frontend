'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { Button } from '@/shared/ui/button/login-button';
import Input from '@/shared/ui/input/input';
import Logo from '@/shared/ui/logo/logo';
import NaverIcon from '@icons/naver.svg';
import KakaoIcon from '@icons/kakao.svg';
import GoogleIcon from '@icons/google.svg';
import CloseIcon from '@icons/close.svg';

const loginModalVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    content:
      'fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    closeButton:
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500',
    title: 'text-lg font-semibold',
    description: 'text-sm text-neutral-500',
    loginForm: 'flex flex-col gap-8',
    socialLoginContainer: 'relative',
    socialLoginDivider: 'absolute inset-0 flex items-center',
    socialLoginText: 'relative flex justify-center text-xs uppercase',
    socialButtonContainer: 'flex justify-center space-x-4',
    signupText: 'text-center text-sm text-gray-500',
  },
});

type LoginModalProps = React.ComponentProps<typeof Dialog.Root> &
  VariantProps<typeof loginModalVariants>;

const LoginModal = ({ onOpenChange, ...props }: LoginModalProps) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    overlay,
    content,
    closeButton,
    loginForm,
    socialLoginContainer,
    socialLoginDivider,
    socialLoginText,
    socialButtonContainer,
    signupText,
  } = loginModalVariants();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        if (onOpenChange) {
          onOpenChange(false);
        }
        router.back();
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlay()} />
        <Dialog.Content className={content()}>
          <Dialog.Title className="sr-only">로그인</Dialog.Title>
          <div className="flex flex-col items-center space-y-8">
            <Logo />
            <div className="w-full space-y-6">
              <form className={loginForm()} onSubmit={handleSubmit}>
                <Input
                  id="email"
                  label="이메일"
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  id="password"
                  label="비밀번호"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="h-12 w-full text-base">
                  로그인
                </Button>
              </form>
              <div className={socialLoginContainer()}>
                <div className={socialLoginDivider()}>
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className={socialLoginText()}>
                  <span className="bg-white px-2 text-neutral-600">간편 로그인</span>
                </div>
              </div>
              <div className={socialButtonContainer()}>
                <button type="button" aria-label="네이버로 로그인">
                  <NaverIcon className="h-10 w-10" />
                </button>
                <button type="button" aria-label="카카오로 로그인">
                  <KakaoIcon className="h-10 w-10" />
                </button>
                <button type="button" aria-label="구글로 로그인">
                  <GoogleIcon className="h-10 w-10" />
                </button>
              </div>
            </div>
            <div className={signupText()}>
              <p>
                아직 회원이 아니신가요?{' '}
                <a href="/signup" className="font-semibold text-orange-500 hover:underline">
                  회원가입
                </a>
              </p>
              <a href="/forgot-password" className="mt-2 inline-block text-xs hover:underline">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>
          <Dialog.Close className={closeButton()}>
            <CloseIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { LoginModal, loginModalVariants };
