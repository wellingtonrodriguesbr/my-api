import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowRoleUseCase } from "./ShowRoleUseCase";

export class ShowRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const showRoleUseCase = container.resolve(ShowRoleUseCase);

    const { id } = req.params;
    const role = await showRoleUseCase.execute({ id });

    return res.json(role);
  }
}
