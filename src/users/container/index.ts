import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "@users/useCases/UpdateAvatar/UpdateCaseController";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("CreateLoginController", CreateLoginController);
container.registerSingleton("UpdateAvatarController", UpdateAvatarController);
