import { createRolesController } from "@roles/useCases/createRole";
import { Router } from "express";

const rolesRouter = Router();

/* rolesRouter.get("/", (req, res) => {
  const roles = rolesRepository.findAll();

  return res.json(roles);
}); */

rolesRouter.post("/", (req, res) => {
  return createRolesController.handle(req, res);
});

export { rolesRouter };
