import { environment } from "../../environments/environment";

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('authToken');

  const headers: HeadersInit = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${environment.baseUrl}${endpoint}`, {
    ...options,
    headers
  });

  return response;
}
