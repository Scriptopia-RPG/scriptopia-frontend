const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object | FormData;
};

const isFormData = (b: unknown): b is FormData =>
  typeof FormData !== 'undefined' && b instanceof FormData;

const customFetch = async <T>(url: string, options?: JsonRequestInit): Promise<T | null> => {
  const accessToken = '';

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(options?.body && !isFormData(options.body) ? { 'Content-Type': 'application/json' } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const fetchOptions: RequestInit = {
    method: options?.method ?? 'GET',
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
    // FormData면 그대로 사용하고 아니면 JSON으로 직렬화
    body: options?.body
      ? isFormData(options.body)
        ? options.body
        : JSON.stringify(options.body)
      : undefined,
  };

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  // 실패면 에러 파싱
  if (!response.ok) {
    let errBody: unknown = null;
    try {
      errBody = await response.json();
    } catch {
      try {
        errBody = await response.text();
      } catch {
        errBody = null;
      }
    }
    throw { status: response.status, statusText: response.statusText, body: errBody, url };
  }

  // 204나 빈 본문이면 null
  if (response.status === 204) return null as T;

  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try {
      return (await response.json()) as T;
    } catch {
      return null as T;
    }
  } else {
    const text = await response.text();
    return text ? (text as unknown as T) : (null as T);
  }
};

export default customFetch;
