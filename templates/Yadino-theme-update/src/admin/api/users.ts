// src/admin/api/users.ts
import { apiFetch, ApiListParams, PaginatedResponse } from './client.ts';

export interface User {
  id: number;
  email: string;
  username?: string;
  full_name?: string;
  role: 'admin' | 'instructor' | 'support' | 'content_manager' | 'student';
  date_joined?: string;
}

export const listUsers = (params: ApiListParams) =>
  apiFetch<PaginatedResponse<User>>('admin/users/', 'GET', undefined, params);

export const updateUserRole = (id: number, role: User['role']) =>
  apiFetch<User>(`admin/users/${id}/`, 'PATCH', { role });
