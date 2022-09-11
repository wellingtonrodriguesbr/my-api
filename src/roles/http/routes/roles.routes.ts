import { RolesRepository } from "@roles/repositories/RolesRepository";
import { Request, Response, Router } from "express";

const rolesRouter = Router();
const rolesRepository = new RolesRepository();

rolesRouter.get("/", (req: Request, res: Response) => {
  const roles = rolesRepository.findAll();

  return res.json(roles);
});

rolesRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  const role = rolesRepository.create({ name });

  return res.status(201).json(role);
});

export { rolesRouter };
