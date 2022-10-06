import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";

export class UpdateRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateRoleUseCase = container.resolve(UpdateRoleUseCase);

    const { id } = req.params;
    const { name } = req.body;
    const role = await updateRoleUseCase.execute({ id, name });

    return res.json(role);
  }
}
