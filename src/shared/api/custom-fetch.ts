import useAuthStore from '@/entities/auth/model/auth.store';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object | FormData;
};

const isFormData = (b: unknown): b is FormData =>
  typeof FormData !== 'undefined' && b instanceof FormData;

const customFetch = async <T>(url: string, options?: JsonRequestInit): Promise<T> => {
  const { accessToken, isTokenValid, clearAuth } = useAuthStore.getState();
  
  // 토큰이 있지만 만료된 경우 자동으로 제거
  if (accessToken && !isTokenValid()) {
    console.log('🕐 만료된 토큰 감지 - 자동 로그아웃');
    clearAuth();
  }
  
  // 유효한 토큰만 헤더에 포함
  const validToken = isTokenValid() ? accessToken : null;

  const method = (options?.method ?? 'GET').toUpperCase();

  const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    ...(options?.body && !isFormData(options.body) ? { 'Content-Type': 'application/json' } : {}),
    ...(validToken ? { Authorization: `Bearer ${validToken}` } : {}),
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
      options?.body && method !== 'HEAD'
        ? isFormData(options.body)
          ? options.body
          : JSON.stringify(options.body)
        : undefined,
  };

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  if (!response.ok) {
    let errorData;
    try {
      const errorText = await response.text();
      errorData = errorText ? JSON.parse(errorText) : null;
    } catch {
      errorData = null;
    }
    
    
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: {
        data: errorData
      },
      url
    };
    
    throw error;
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
