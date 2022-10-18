import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { CreateAccessAndRefreshTokenUseCase } from "./CreateAccessAndRefreshTokenUseCase";

export class CreateAccessAndRefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createAccessAndRefreshTokenUseCase = container.resolve(CreateAccessAndRefreshTokenUseCase);

    const user_id = req.user.id;
    const { refresh_token } = req.body;
    const { user, accessToken, refreshToken } = await createAccessAndRefreshTokenUseCase.execute({
      refresh_token,
      user_id,
    });

    return res.status(201).json(instanceToInstance({ user, accessToken, refreshToken }));
  }
}
