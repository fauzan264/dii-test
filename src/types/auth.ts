import { User } from "../generated/prisma";

export interface AuthRegisterRequest extends Pick<User, 'fullName' | 'username'> {
  password: string;
  role: string;
}

export interface AuthLoginRequest extends Pick<User, 'username'> {
  password: string;
  role: string;
}

export interface AuthSessionRequest {
  id: string;
  role: string;
}