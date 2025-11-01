import useAuthStore from '@/entities/auth/model/auth.store';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';

type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object | FormData;
};

const isFormData = (b: unknown): b is FormData =>
  typeof FormData !== 'undefined' && b instanceof FormData;

const customFetch = async <T>(
  url: string,
  options?: JsonRequestInit,
  isRetry = false,
): Promise<T> => {
  const { accessToken, setAuth } = useAuthStore.getState();

  const method = (options?.method ?? 'GET').toUpperCase();

  const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    ...(options?.body && !isFormData(options.body) ? { 'Content-Type': 'application/json' } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const normalizedHeaders = new Headers(defaultHeaders);
  if (options?.headers) {
    new Headers(options.headers).forEach((v, k) => normalizedHeaders.set(k, v));
  }
  if (options?.body && isFormData(options.body)) {
    normalizedHeaders.delete('Content-Type');
  }

  const fetchOptions: RequestInit = {
    ...options,
    method,
    headers: normalizedHeaders,
    credentials: 'include',
    body:
      options?.body && !['GET', 'HEAD'].includes(method)
        ? isFormData(options.body)
          ? options.body
          : JSON.stringify(options.body)
        : undefined,
  };

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  if (!response.ok) {
    // 401 Unauthorized 에러이고 이미 재시도하지 않은 경우 refresh token 시도
    if (response.status === 401 && !isRetry && url !== '/token/refresh') {
      try {
        // refresh token 요청 (직접 fetch 사용, customFetch 사용 안 함)
        const refreshResponse = await fetch(`${BASE_URL}/token/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!refreshResponse.ok) {
          throw new Error('Failed to refresh token');
        }

        const refreshData = await refreshResponse.json();
        setAuth(refreshData.accessToken, refreshData.expiresIn);

        // refresh 성공 시 원래 요청 재시도
        return customFetch(url, options, true);
      } catch {
        // refresh 실패 시 auth state 초기화
        useAuthStore.getState().clearAuth();
        const errBody = await response.text().catch(() => null);
        throw { status: response.status, statusText: response.statusText, body: errBody, url };
      }
    }

    const errBody = await response.text().catch(() => null);
    throw { status: response.status, statusText: response.statusText, body: errBody, url };
  }

  // 204나 빈 본문이면 null
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return (await response.json()) as T;
  }
  return (await response.text()) as unknown as T;
};

export default customFetch;
