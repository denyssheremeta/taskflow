import { api } from "../../api/client";

export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  status: "success";
  message?: string;
  data: {
    token: string;
    user: User;
  };
};

export type CurrentUserResponse = {
  status: "success";
  data: {
    user: User;
  };
};

export type AuthPayload = {
  email: string;
  password: string;
};

export async function registerRequest(payload: AuthPayload) {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
}

export async function loginRequest(payload: AuthPayload) {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
}

export async function getCurrentUserRequest() {
  const response = await api.get<CurrentUserResponse>("/auth/me");
  return response.data;
}
