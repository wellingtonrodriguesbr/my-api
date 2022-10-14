import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
    const user = await updateAvatarUseCase.execute({ avatarFileName: req.file.filename, userId: req.user.id });

    return res.json(instanceToInstance(user));
  }
}
