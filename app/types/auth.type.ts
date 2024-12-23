import { InferAttributes, Model, WhereOptions } from 'sequelize';
import type { CurrentUserInformationData } from './user.type';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: CurrentUserInformationData;
}

export interface RefreshTokenRequest {
  username: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserData {
  username: string;
  role_ids: number[];
  dataareaid?: string | null;
  email?: string | null;
  vendor_id?: number;
}

export type WhereClause<T extends Model> = WhereOptions<
  InferAttributes<
    T,
    {
      omit: never;
    }
  >
>;
