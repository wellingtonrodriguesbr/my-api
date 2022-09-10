import { rolesRouter } from "@roles/http/routes/roles.routes";
import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World!" });
});

routes.use("/roles", rolesRouter);

export { routes };
