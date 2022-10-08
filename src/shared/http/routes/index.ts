import { rolesRouter } from "@roles/http/routes/roles.routes";
import { usersRouter } from "@users/http/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/roles", rolesRouter);
routes.use("/users", usersRouter);

export { routes };
