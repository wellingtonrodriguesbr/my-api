import { Request, Response } from "express";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";

export class UpdateRoleController {
  constructor(private updateRoleController: UpdateRoleUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;
    const role = await this.updateRoleController.execute({ id, name });

    return res.json(role);
  }
}
