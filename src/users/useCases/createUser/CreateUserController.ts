import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { instanceToInstance } from "class-transformer";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password, isAdmin, roleId } = req.body;
    const user = await createUserUseCase.execute({ name, email, password, isAdmin, roleId });

    return res.status(201).json(instanceToInstance(user));
  }
}
