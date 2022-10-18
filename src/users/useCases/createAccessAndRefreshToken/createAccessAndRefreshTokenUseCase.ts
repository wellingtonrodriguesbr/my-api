import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import jwtConfig from "@config/auth";

type CreateAccessAndRefreshTokenDTO = {
  user_id: string;
  refresh_token: string;
};

type IResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

injectable();
export class CreateAccessAndRefreshTokenUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute({ user_id, refresh_token }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      new AppError("User not found!", 404);
    }

    const refreshTokenExists = await this.refreshTokenRepository.findByToken(refresh_token);
    if (!refreshTokenExists) {
      new AppError("Refresh Token is required!", 401);
    }

    const dateNow = new Date().getTime();
    if (!refreshTokenExists.valid || refreshTokenExists.expires.getTime() < dateNow) {
      new AppError("Refresh Token is invalid/expired!", 401);
    }

    await this.refreshTokenRepository.invalidate(refreshTokenExists);

    const accessToken = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);

    const refreshToken = sign({}, jwtConfig.refreshToken.secret, {
      subject: user.id,
      expiresIn: jwtConfig.refreshToken.expiresIn,
    });

    await this.refreshTokenRepository.create({ expires, token: refreshToken, user_id: user.id, valid: true });
    return { user, accessToken, refreshToken };
  }
}
