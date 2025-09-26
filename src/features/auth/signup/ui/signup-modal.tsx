'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useEmailDuplicateCheck } from '@/features/auth/signup/api/use-email-duplicate-check.mutation';
import { useSendEmailCode } from '@/features/auth/signup/api/use-send-email-code.mutation';
import { useSignup } from '@/features/auth/signup/api/use-signup.mutation';
import { useVerifyEmailCode } from '@/features/auth/signup/api/use-verify-email-code.mutation';
import Modal from '@/shared/ui/modal/modal';
import CloseButton from '@/shared/ui/button/close-button';
import LogoText from '@public/logo/logo-text.svg';
import Input from '@/shared/ui/input/input';
import Button from '@/shared/ui/button/button';
import SocialAuth from '@/features/auth/social/social-auth';

const CODE_COOLDOWN_SECONDS = 30;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (error && typeof error === 'object') {
    const maybe = error as { body?: string; statusText?: string };
    if (maybe.body) {
      try {
        const parsed = JSON.parse(maybe.body);
        if (parsed?.message) {
          return parsed.message as string;
        }
      } catch {
        return maybe.body;
      }
    }
    if (maybe.statusText) {
      return maybe.statusText;
    }
  }

  return '회원가입에 실패했습니다.';
};

type FieldKey = 'email' | 'nickname' | 'password' | 'passwordConfirm' | 'code';

type FormState = Record<FieldKey, string>;

const SignupModal = () => {
  const router = useRouter();
  const { mutate: signup, isPending: isSigningUp } = useSignup();
  const { mutate: checkEmailDuplicate, isPending: isCheckingDuplicate } = useEmailDuplicateCheck();
  const { mutate: sendEmailCode, isPending: isSendingCode } = useSendEmailCode();
  const { mutate: verifyEmailCode, isPending: isVerifyingCode } = useVerifyEmailCode();

  const [form, setForm] = useState<FormState>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    code: '',
  });
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [lastCodeSentAt, setLastCodeSentAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [codeStatus, setCodeStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!lastCodeSentAt) {
      setRemainingSeconds(0);
      return;
    }

    const tick = () => {
      const diff = Math.floor((Date.now() - lastCodeSentAt) / 1000);
      const next = Math.max(0, CODE_COOLDOWN_SECONDS - diff);
      setRemainingSeconds(next);
      if (next === 0) {
        setLastCodeSentAt(null);
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [lastCodeSentAt]);

  const handleChange = (key: FieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setForm((prev) => {
      if (key === 'email') {
        return {
          ...prev,
          email: value,
          code: '',
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });

    if (key === 'email') {
      setIsEmailAvailable(false);
      setIsEmailVerified(false);
      setEmailStatus(null);
      setCodeStatus(null);
      setLastCodeSentAt(null);
    }

    if (key === 'code') {
      setIsEmailVerified(false);
      setCodeStatus(null);
    }
  };

  const email = form.email.trim();
  const nickname = form.nickname.trim();
  const hasEmptyField = !email || !nickname || !form.password || !form.passwordConfirm;
  const hasMismatch = form.password !== form.passwordConfirm;

  const isSubmitDisabled = useMemo(() => {
    return isSigningUp || hasEmptyField || hasMismatch || !isEmailVerified;
  }, [hasEmptyField, hasMismatch, isEmailVerified, isSigningUp]);

  const canCheckDuplicate = email.length > 0 && !isCheckingDuplicate;
  const canSendCode = isEmailAvailable && !isEmailVerified && remainingSeconds === 0 && !isSendingCode;
  const canVerifyCode = isEmailAvailable && !isEmailVerified && form.code.trim().length === 6 && !isVerifyingCode;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      if (!isEmailVerified) {
        alert('이메일 인증을 완료해주세요.');
      }
      return;
    }

    signup(
      {
        email,
        nickname,
        password: form.password,
      },
      {
        onSuccess: () => {
          router.back();
          router.refresh();
        },
        onError: (error) => {
          alert(getErrorMessage(error));
        },
      },
    );
  };

  const handleCheckEmail = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    checkEmailDuplicate(
      { email },
      {
        onSuccess: (response) => {
          setIsEmailAvailable(true);
          setIsEmailVerified(false);
          setEmailStatus(response.message ?? '사용 가능한 이메일입니다.');
          setCodeStatus(null);
        },
        onError: (error) => {
          setIsEmailAvailable(false);
          setEmailStatus(null);
          alert(getErrorMessage(error));
        },
      },
    );
  };

  const handleSendCode = () => {
    if (!isEmailAvailable) {
      alert('이메일 중복 확인을 먼저 완료해주세요.');
      return;
    }

    sendEmailCode(
      { email },
      {
        onSuccess: (response) => {
          setLastCodeSentAt(Date.now());
          setIsEmailVerified(false);
          setCodeStatus(response.message ?? '인증 코드가 이메일로 발송되었습니다.');
          if (response.code) {
            setForm((prev) => ({ ...prev, code: response.code ?? prev.code }));
          }
        },
        onError: (error) => {
          alert(getErrorMessage(error));
        },
      },
    );
  };

  const handleVerifyCode = () => {
    const code = form.code.trim();

    if (code.length !== 6) {
      alert('인증 코드는 6자리 숫자를 입력해주세요.');
      return;
    }

    verifyEmailCode(
      { email, code },
      {
        onSuccess: (response) => {
          setIsEmailVerified(true);
          setCodeStatus(response.message ?? '이메일 인증이 완료되었습니다.');
        },
        onError: (error) => {
          setIsEmailVerified(false);
          alert(getErrorMessage(error));
        },
      },
    );
  };

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
          회원가입
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Input
              id="signup-email"
              label="이메일"
              type="email"
              placeholder="이메일을 입력해 주세요."
              value={form.email}
              onChange={handleChange('email')}
              disabled={isEmailVerified}
              required
            />
            <Button
              type="button"
              label={isCheckingDuplicate ? '확인 중...' : '이메일 중복 확인'}
              onClick={handleCheckEmail}
              disabled={!canCheckDuplicate}
            />
            {emailStatus && <p className="text-xs text-primary">{emailStatus}</p>}
          </div>

          <div className="space-y-2">
            <Input
              id="signup-code"
              label="인증 코드"
              placeholder="인증 코드를 입력해 주세요."
              value={form.code}
              onChange={handleChange('code')}
              disabled={!isEmailAvailable || isEmailVerified}
            />
            <Button
              type="button"
              label={isSendingCode ? '코드 발송 중...' : remainingSeconds > 0 ? `재전송 (${remainingSeconds}s)` : '인증 코드 발송'}
              onClick={handleSendCode}
              disabled={!canSendCode}
            />
            <Button
              type="button"
              label={isVerifyingCode ? '확인 중...' : '인증 코드 확인'}
              onClick={handleVerifyCode}
              disabled={!canVerifyCode}
            />
            {codeStatus && <p className="text-xs text-primary">{codeStatus}</p>}
          </div>

          <Input
            id="signup-nickname"
            label="닉네임"
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
          <Button
            type="submit"
            label={isSigningUp ? '회원가입 중...' : '회원가입'}
            disabled={isSubmitDisabled}
          />
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
