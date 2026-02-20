// src/admin/api/client.ts
const BASE_URL = 'http://localhost:8000/api/';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiListParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getToken = () => localStorage.getItem('adminAccessToken');

export const setToken = (token: string | null) => {
  if (token) localStorage.setItem('adminAccessToken', token);
  else localStorage.removeItem('adminAccessToken');
};

export const apiFetch = async <T = any>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: any,
  params?: Record<string, any>,
  extraHeaders?: HeadersInit
): Promise<T> => {
  const token = getToken();

  const query = params
    ? '?' +
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';

  const res = await fetch(BASE_URL + endpoint + query, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    setToken(null);
    window.location.reload();
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return null as T;
  return res.json();
};
