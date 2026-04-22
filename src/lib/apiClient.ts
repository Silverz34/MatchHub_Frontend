// Cliente HTTP genérico para MatchHub API.
// Inyecta automáticamente el Bearer token de Clerk en cada petición.

import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";


export interface ApiError {
  error: string;
  details?: { field: string; message: string }[];
  code?: string;
}

export class ApiRequestError extends Error {
  readonly status: number;
  readonly body: ApiError;

  constructor(status: number, body: ApiError) {
    super(body.error ?? `HTTP ${status}`);
    this.status = status;
    this.body = body;
  }
}


function buildHeaders(token: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(
  method: string,
  endpoint: string,
  token: string | null,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: buildHeaders(token),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    let errorBody: ApiError = { error: `HTTP ${res.status}` };
    try {
      errorBody = await res.json();
    } catch {
    
    }
    throw new ApiRequestError(res.status, errorBody);
  }
  if (res.status === 204) return null as T;

  return res.json() as Promise<T>;
}

export function createApiClient(token: string | null) {
  return {
    get: <T>(endpoint: string) =>
      request<T>("GET", endpoint, token),

    post: <T>(endpoint: string, body?: unknown) =>
      request<T>("POST", endpoint, token, body),

    put: <T>(endpoint: string, body?: unknown) =>
      request<T>("PUT", endpoint, token, body),

    patch: <T>(endpoint: string, body?: unknown) =>
      request<T>("PATCH", endpoint, token, body),

    delete: <T>(endpoint: string) =>
      request<T>("DELETE", endpoint, token),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;

// ---------------------------------------------------------------------------
// Hook — obtiene el token de Clerk y expone getClient()
// ---------------------------------------------------------------------------
//
// Uso:
//   const { getClient } = useApi();
//
//   const handleSave = async () => {
//     const api = await getClient();
//     const data = await api.get<Profile>("/profile");
//   };
//
// ---------------------------------------------------------------------------

export function useApi() {
  const { getToken } = useAuth();

  const getClient = useCallback(async (): Promise<ApiClient> => {
    const token = await getToken();
    return createApiClient(token);
  }, [getToken]);

  return { getClient };
}