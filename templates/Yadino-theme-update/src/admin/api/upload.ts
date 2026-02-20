// src/admin/api/upload.ts
import { getToken } from './client';

const BASE_URL = 'http://localhost:8000/api/';

export const uploadFile = async (file: File, type: 'cover' | 'video') => {
  const token = getToken();
  const formData = new FormData();
  formData.append(type, file);

  const res = await fetch(`${BASE_URL}admin/upload-${type}/`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};
