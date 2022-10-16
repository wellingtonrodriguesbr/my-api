import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

export class UpdateProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);
    const userId = req.user.id;

    const { name, email, password, oldPassword } = req.body;
    const user = await updateProfileUseCase.execute({ name, email, password, userId, oldPassword });

    return res.status(200).json(instanceToInstance(user));
  }
}
