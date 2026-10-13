export interface User {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  language: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}
