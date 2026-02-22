const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function apiFetch(
  url: string,
  method: string = "GET",
  body?: any,
  isFormData: boolean = false
) {
  const token = localStorage.getItem("access");

  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(API_BASE + url, options);

  if (!response.ok) {
    let errorMessage = "خطایی رخ داد";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || JSON.stringify(errorData);
    } catch {}

    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export default apiFetch;
