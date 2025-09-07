import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { MSWProvider } from '@/app/providers/msw-provider';
import { ReactQueryProvider } from '@/app/providers/react-query-provider';

import { pretendard } from '@/shared/styles/fonts';
import '@/shared/styles/globals.css';

if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production') {
  const { server } = await import('@/shared/api/mocks/server');
  server.listen();
}

export const metadata: Metadata = {
  title: 'Scriptopia',
  description: 'AI 기반 로그라이크 텍스트 RPG',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <MSWProvider>
          {modal}
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
