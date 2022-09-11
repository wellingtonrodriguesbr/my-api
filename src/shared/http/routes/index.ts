import { rolesRouter } from "@roles/http/routes/roles.routes";
import { Router } from "express";

const routes = Router();

routes.use("/roles", rolesRouter);

export { routes };
