const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object | FormData;
};

const isFormData = (b: unknown): b is FormData =>
  typeof FormData !== 'undefined' && b instanceof FormData;

const customFetch = async <T>(url: string, options?: JsonRequestInit): Promise<T> => {
  const accessToken = '';

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
    body:
      options?.body && !['GET', 'HEAD'].includes(method)
        ? isFormData(options.body)
          ? options.body
          : JSON.stringify(options.body)
        : undefined,
  };

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  if (!response.ok) {
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
