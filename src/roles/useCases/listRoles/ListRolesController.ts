import { Request, Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase";

export class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase) {}

  handle(req: Request, res: Response) {
    const roles = this.listRolesUseCase.execute();

    return res.status(201).json(roles);
  }
}
