import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { CreateRoleController } from "@roles/useCases/createRole/CreateRoleController";
import { DeleteRoleController } from "@roles/useCases/deleteRole/DeleteRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";
import { ShowRoleController } from "@roles/useCases/showRole/ShowRoleController";
import { UpdateRoleController } from "@roles/useCases/updateRole/UpdateRoleController";

const rolesRouter = Router();

const createRoleController = new CreateRoleController();
const deleteRoleController = new DeleteRoleController();
const listRolesController = new ListRolesController();
const showRoleController = new ShowRoleController();
const updateRoleController = new UpdateRoleController();

rolesRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listRolesController.handle(req, res);
  },
);

rolesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return createRoleController.handle(req, res);
  },
);

rolesRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return showRoleController.handle(req, res);
  },
);

rolesRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return updateRoleController.handle(req, res);
  },
);

rolesRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return deleteRoleController.handle(req, res);
  },
);

export { rolesRouter };
