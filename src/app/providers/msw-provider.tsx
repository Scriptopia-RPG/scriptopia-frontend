'use client';

import { ReactNode, Suspense, use } from 'react';
import { handlers } from '@/shared/api/mocks/handlers';

declare global {
  interface ImportMeta {
    hot?: { dispose(cb: () => void): void };
  }
}

const enableMocking =
  process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_API_MOCKING === 'true';

const mockingEnabledPromise =
  typeof window !== 'undefined' && enableMocking
    ? import('@/shared/api/mocks/browser').then(async ({ default: worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return;
            }
            // 게임 세션 관련 API는 실제 API를 사용하므로 경고 무시
            if (request.url.includes('/games/') && 
                (request.url.includes('/select') || request.url.includes('/progress'))) {
              return;
            }
            // Chrome extension 요청 무시
            if (request.url.includes('chrome-extension://')) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);

        import.meta.hot?.dispose(() => {
          worker.stop();
        });
        console.log(worker.listHandlers());
      })
    : Promise.resolve();

export const MSWProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
};

const MSWProviderWrapper = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  use(mockingEnabledPromise);
  return children;
};
