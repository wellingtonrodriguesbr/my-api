import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import multer from "multer";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import uploadConfig from "@config/upload";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateCaseController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";
import { UpdateProfileController } from "@users/useCases/updateProfile/UpdateProfileController";

export const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);
const showProfileController = container.resolve(ShowProfileController);
const updateProfileController = container.resolve(UpdateProfileController);

const upload = multer(uploadConfig);

usersRouter.post(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    },
  }),
  (req, res) => {
    return createUserController.handle(req, res);
  },
);

usersRouter.get(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listUsersController.handle(req, res);
  },
);

usersRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (req, res) => {
    return createLoginController.handle(req, res);
  },
);

usersRouter.patch("/avatar", isAuthenticated, upload.single("avatar"), (req, res) => {
  return updateAvatarController.handle(req, res);
});

usersRouter.get("/profile", isAuthenticated, (req, res) => {
  return showProfileController.handle(req, res);
});

usersRouter.put(
  "/profile",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string().valid(Joi.ref("password")).when("password", {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  (req, res) => {
    return updateProfileController.handle(req, res);
  },
);
