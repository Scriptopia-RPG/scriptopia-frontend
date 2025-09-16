'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Link from 'next/link';

import CloseButton from '@/shared/ui/button/close-button';
import LogoText from '@public/logo/logo-text.svg';
import Modal from '@/shared/ui/modal/modal';
import Input from '@/shared/ui/input/input';
import Button from '@/shared/ui/button/button';
import SocialLogin from '@/features/auth/login/ui/social-login';
import { useLogin } from '@/entities/user/api/use-login.mutation';

const LoginModal = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    mutate(
      { email, password, deviceId: '1' },
      {
        onSuccess: () => {
          router.back();
          router.refresh();
        },
        onError: (err) => {
          alert((err as Error).message);
        },
      },
    );
  };

  return (
    <Modal ariaLabelledby="login-title" onClose={() => router.back()}>
      <div className="flex flex-col justify-center space-y-6 p-6">
        <div className="flex justify-end">
          <CloseButton onClick={() => router.back()} />
        </div>

        <div className="flex justify-center">
          <LogoText className="w-44" />
        </div>

        <h1 id="login-title" className="sr-only">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
          <Button
            type="submit"
            label={isPending ? '로그인 중…' : '로그인'}
            disabled={isPending || !email || !password}
          />
        </form>

        <SocialLogin />

        <div className="flex flex-col items-center gap-y-6 text-xs text-gray-400">
          <div className="flex gap-x-2.5">
            <p>아직 회원이 아니신가요?</p>
            <Link href="/auth/signup" className="text-primary font-medium">
              회원가입
            </Link>
          </div>
          <Link href="/auth/forgot">비밀번호 찾기</Link>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
