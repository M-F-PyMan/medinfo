// src/admin/api/courses.ts
import { apiFetch, ApiListParams, PaginatedResponse } from './client';

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  status: 'active' | 'inactive';
  cover?: string;
  video?: string;
  students_count?: number;
}

export const listCourses = (params: ApiListParams) =>
  apiFetch<PaginatedResponse<Course>>('admin/courses/', 'GET', undefined, params);

export const createCourse = (data: Partial<Course>) =>
  apiFetch<Course>('admin/courses/', 'POST', data);

export const updateCourse = (id: number, data: Partial<Course>) =>
  apiFetch<Course>(`admin/courses/${id}/`, 'PUT', data);

export const deleteCourse = (id: number) =>
  apiFetch(`admin/courses/${id}/`, 'DELETE');
