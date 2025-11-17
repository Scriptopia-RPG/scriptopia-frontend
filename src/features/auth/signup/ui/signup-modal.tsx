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

const CODE_COOLDOWN_SECONDS = 60;

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

type StatusMessage = {
  type: 'success' | 'error';
  text: string;
};

const getStatusTextClass = (message: StatusMessage | null) => {
  if (!message) {
    return '';
  }

  return message.type === 'error' ? 'text-red-500' : 'text-primary';
};

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
  const [emailMessage, setEmailMessage] = useState<StatusMessage | null>(null);
  const [codeMessage, setCodeMessage] = useState<StatusMessage | null>(null);
  const [signupMessage, setSignupMessage] = useState<StatusMessage | null>(null);

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

    setSignupMessage(null);

    if (key === 'email') {
      setIsEmailAvailable(false);
      setIsEmailVerified(false);
      setEmailMessage(null);
      setCodeMessage(null);
      setLastCodeSentAt(null);
    }

    if (key === 'code') {
      setIsEmailVerified(false);
      setCodeMessage(null);
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
  const canSendCode =
    isEmailAvailable && !isEmailVerified && remainingSeconds === 0 && !isSendingCode;
  const canVerifyCode =
    isEmailAvailable && !isEmailVerified && form.code.trim().length === 6 && !isVerifyingCode;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      if (hasEmptyField) {
        setSignupMessage({ type: 'error', text: '필수 정보를 모두 입력해 주세요.' });
      } else if (hasMismatch) {
        setSignupMessage({ type: 'error', text: '비밀번호가 일치하지 않습니다.' });
      } else if (!isEmailVerified) {
        setSignupMessage({ type: 'error', text: '이메일 인증을 완료해 주세요.' });
      }
      return;
    }

    setSignupMessage(null);

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
          setSignupMessage({ type: 'error', text: getErrorMessage(error) });
        },
      },
    );
  };

  const handleCheckEmail = () => {
    if (!email) {
      setEmailMessage({ type: 'error', text: '이메일을 입력해 주세요.' });
      return;
    }

    setEmailMessage(null);
    setCodeMessage(null);

    checkEmailDuplicate(
      { email },
      {
        onSuccess: (response) => {
          setIsEmailAvailable(true);
          setIsEmailVerified(false);
          setEmailMessage({
            type: 'success',
            text: response.message ?? '사용 가능한 이메일입니다.',
          });
          setCodeMessage(null);
        },
        onError: (error) => {
          setIsEmailAvailable(false);
          setEmailMessage({ type: 'error', text: getErrorMessage(error) });
        },
      },
    );
  };

  const handleSendCode = () => {
    if (!isEmailAvailable) {
      setEmailMessage({ type: 'error', text: '이메일 중복 확인을 먼저 완료해 주세요.' });
      return;
    }

    setCodeMessage(null);

    sendEmailCode(
      { email },
      {
        onSuccess: (response) => {
          setLastCodeSentAt(Date.now());
          setIsEmailVerified(false);
          setCodeMessage({
            type: 'success',
            text: response.message ?? '인증 코드가 이메일로 발송되었습니다.',
          });
          if (response.code) {
            setForm((prev) => ({ ...prev, code: response.code ?? prev.code }));
          }
        },
        onError: (error) => {
          setCodeMessage({ type: 'error', text: getErrorMessage(error) });
        },
      },
    );
  };

  const handleVerifyCode = () => {
    const code = form.code.trim();

    if (code.length !== 6) {
      setCodeMessage({ type: 'error', text: '인증 코드는 6자리 숫자로 입력해 주세요.' });
      return;
    }

    setCodeMessage(null);

    verifyEmailCode(
      { email, code },
      {
        onSuccess: (response) => {
          setIsEmailVerified(true);
          setCodeMessage({
            type: 'success',
            text: response.message ?? '이메일 인증이 완료되었습니다.',
          });
          setSignupMessage(null);
        },
        onError: (error) => {
          setIsEmailVerified(false);
          setCodeMessage({ type: 'error', text: getErrorMessage(error) });
        },
      },
    );
  };

  const emailMessageClass = getStatusTextClass(emailMessage);
  const codeMessageClass = getStatusTextClass(codeMessage);
  const signupMessageClass = getStatusTextClass(signupMessage);

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
            {emailMessage && <p className={`text-xs ${emailMessageClass}`}>{emailMessage.text}</p>}
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
              label={
                isSendingCode
                  ? '코드 발송 중...'
                  : remainingSeconds > 0
                    ? `재전송 (${remainingSeconds}s)`
                    : '인증 코드 발송'
              }
              onClick={handleSendCode}
              disabled={!canSendCode}
            />
            <Button
              type="button"
              label={isVerifyingCode ? '확인 중...' : '인증 코드 확인'}
              onClick={handleVerifyCode}
              disabled={!canVerifyCode}
            />
            {codeMessage && <p className={`text-xs ${codeMessageClass}`}>{codeMessage.text}</p>}
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

          {signupMessage && <p className={`text-xs ${signupMessageClass}`}>{signupMessage.text}</p>}

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
            <button
              type="button"
              onClick={() => router.replace('/auth/login', { scroll: false })}
              className="text-primary cursor-pointer font-medium"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignupModal;
