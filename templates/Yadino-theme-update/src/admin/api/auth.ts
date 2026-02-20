// src/admin/api/auth.ts
import { apiFetch, setToken } from './client.ts';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'instructor' | 'support' | 'content_manager';
}

export interface LoginResponse {
  access: string;
  refresh?: string;
  user: AdminUser;
}

export const login = async (username: string, password: string) => {
  const data = await apiFetch<LoginResponse>('token/', 'POST', { username, password });
  setToken(data.access);
  return data;
};
