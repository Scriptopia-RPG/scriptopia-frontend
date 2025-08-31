
'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Button type="submit" className="w-full h-12 text-base">
        로그인
      </Button>
    </form>
  );
}
