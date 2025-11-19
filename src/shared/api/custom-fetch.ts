import useAuthStore from '@/entities/auth/model/auth.store';

// 프록시를 통해 같은 도메인으로 요청하여 쿠키 전송 보장
// next.config.ts의 rewrites를 통해 백엔드로 프록시됨
// /api/:path* -> ${NEXT_PUBLIC_API_URL}/api/${NEXT_PUBLIC_API_VERSION}/:path*
const API_URL = '/api';

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

  let response: Response;
  try {
    // 프록시를 통해 /api로 요청하면 next.config.ts의 rewrites가
    // ${NEXT_PUBLIC_API_URL}/api/${NEXT_PUBLIC_API_VERSION}${url}로 프록시함
    response = await fetch(`${API_URL}${url}`, fetchOptions);
  } catch (fetchError) {
    console.error('[customFetch] fetch 실패:', fetchError);
    throw {
      status: 0,
      statusText: 'Network Error',
      body: fetchError instanceof Error ? fetchError.message : 'Unknown error',
      url,
    };
  }

  console.log(
    '[customFetch] 요청:',
    `${API_URL}${url}`,
    '(프록시를 통해 백엔드로 전달)',
    '상태:',
    response.status,
    'isRetry:',
    isRetry,
  );

  if (!response.ok) {
    console.log(
      '[customFetch] 응답 에러:',
      response.status,
      response.statusText,
      url,
      'isRetry:',
      isRetry,
      '조건 체크:',
      {
        is401or403: response.status === 401 || response.status === 403,
        notRetry: !isRetry,
        notRefresh: url !== '/token/refresh',
        allConditions:
          (response.status === 401 || response.status === 403) &&
          !isRetry &&
          url !== '/token/refresh',
      },
    );
    // 401 Unauthorized 또는 403 Forbidden 에러이고 이미 재시도하지 않은 경우 refresh token 시도
    // (일부 백엔드는 만료된 토큰에 대해 403을 반환할 수 있음)
    if (
      (response.status === 401 || response.status === 403) &&
      !isRetry &&
      url !== '/token/refresh'
    ) {
      try {
        console.log(`[customFetch] ${response.status} 에러 감지, refresh token 시도:`, url);

        // 쿠키 확인 (디버깅용)
        // 주의: HttpOnly 쿠키는 document.cookie로 확인할 수 없음
        const cookies = document.cookie;
        console.log('[customFetch] 현재 쿠키 (HttpOnly 제외):', cookies || '(쿠키 없음)');
        console.log('[customFetch] refresh token 요청 URL:', `${API_URL}/token/refresh`);

        // refresh token 요청 (프록시를 통해 같은 도메인으로 요청하여 쿠키 전송 보장)
        // credentials: 'include'로 쿠키 전송 보장
        const refreshResponse = await fetch(`${API_URL}/token/refresh`, {
          method: 'POST',
          credentials: 'include', // 쿠키 포함 필수 (크로스 도메인 요청 시 SameSite=None 필요)
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deviceId: '1' }),
        });

        console.log(
          '[customFetch] refresh token 응답:',
          refreshResponse.status,
          refreshResponse.ok,
        );

        if (!refreshResponse.ok) {
          const errorText = await refreshResponse.text().catch(() => '');
          console.error(
            '[customFetch] refresh token 실패 상세:',
            refreshResponse.status,
            errorText,
          );
          throw new Error(`Failed to refresh token: ${refreshResponse.status} ${errorText}`);
        }

        const refreshData = await refreshResponse.json();

        if (!refreshData.accessToken || !refreshData.expiresIn) {
          throw new Error('Invalid refresh token response');
        }

        setAuth(refreshData.accessToken, refreshData.expiresIn);
        console.log('[customFetch] refresh token 성공, 원래 요청 재시도');

        // refresh 성공 시 원래 요청 재시도
        return customFetch(url, options, true);
      } catch (refreshError) {
        console.error('[customFetch] refresh token 실패:', refreshError);
        // refresh 실패 시 auth state 초기화
        useAuthStore.getState().clearAuth();
        const errBody = await response.text().catch(() => null);
        throw {
          status: response.status,
          statusText: response.statusText,
          body: errBody,
          url,
          refreshError: refreshError instanceof Error ? refreshError.message : 'Unknown error',
        };
      }
    }

    console.log('[customFetch] 에러 발생 (401 아님 또는 재시도):', response.status, url);
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
