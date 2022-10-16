import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

type UpdateProfileDTO = {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
};

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password, userId, oldPassword }: UpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("Email address already used!");
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError("There is already one user with this email");
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password does not match!");
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}
