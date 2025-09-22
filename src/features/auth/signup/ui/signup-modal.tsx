'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import Modal from '@/shared/ui/modal/modal';
import CloseButton from '@/shared/ui/button/close-button';
import LogoText from '@public/logo/logo-text.svg';
import Input from '@/shared/ui/input/input';
import Button from '@/shared/ui/button/button';
import SocialAuth from '@/features/auth/social/social-auth';

type FieldKey = 'email' | 'nickname' | 'password' | 'passwordConfirm';

type FormState = Record<FieldKey, string>;

const SignupModal = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (key: FieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: integrate signup API
  };

  const isSubmitDisabled = useMemo(() => {
    if (!form.email || !form.nickname || !form.password || !form.passwordConfirm) {
      return true;
    }

    return form.password !== form.passwordConfirm;
  }, [form]);

  return (
    <Modal ariaLabelledby="signup-title" onClose={() => router.back()}>
      <div className="flex flex-col justify-center space-y-6 p-6">
        <div className="flex justify-end">
          <CloseButton onClick={() => router.back()} />
        </div>

        <div className="flex justify-center">
          <LogoText className="w-44" />
        </div>

        <h1 id="signup-title" className="sr-only">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="signup-email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={form.email}
            onChange={handleChange('email')}
            required
          />
          <Input
            id="signup-nickname"
            label="닉네임임"
            placeholder="닉네임을 입력해 주세요."
            value={form.nickname}
            onChange={handleChange('nickname')}
            required
          />
          <Input
            id="signup-password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={form.password}
            onChange={handleChange('password')}
            required
          />
          <Input
            id="signup-password-confirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요."
            value={form.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
            required
          />
          <Button type="submit" label="Create Account" disabled={isSubmitDisabled} />
        </form>

        <SocialAuth mode="signup" />

        <div className="flex flex-col items-center gap-y-6 text-xs text-gray-400">
          <div className="flex gap-x-2.5">
            <p>이미 회원이신가요?</p>
            <Link href="/auth/login" className="text-primary font-medium">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignupModal;
