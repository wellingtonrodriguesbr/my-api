import { RefreshToken } from "@users/entities/RefreshToken";

export type CreateRefreskTokenDTO = {
  user_id: string;
  token: string;
  expires: Date;
  valid: boolean;
};

export interface IRefreshTokenRepository {
  create({ expires, token, user_id, valid }: CreateRefreskTokenDTO): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  invalidate(refresh_token: RefreshToken): Promise<void>;
}
