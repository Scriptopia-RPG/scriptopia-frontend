import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { MSWProvider } from '@/app/providers/msw-provider';
import './globals.css';

// if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production') {
//   const { server } = require('@/shared/api/mocks/server');
//   server.listen();
// }

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Scriptopia',
  description: 'AI 기반 로그라이크 텍스트 RPG',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
