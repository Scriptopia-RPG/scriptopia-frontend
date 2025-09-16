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
