import { Role } from "@roles/entities/Role";
import { RefreshToken } from "@users/entities/RefreshToken";
import { User } from "@users/entities/User";
import { DataSource } from "typeorm";
import { CreateRolesTable1664103295889 } from "./migrations/1664103295889-CreateRolesTable";
import { CreateUsersTable1665137880643 } from "./migrations/1665137880643-CreateUsersTable";
import { AddRoleIdToUsersTable1665138325079 } from "./migrations/1665138325079-AddRoleIdToUsersTable";
import { CreateRefreshTokensTable1665994923583 } from "./migrations/1665994923583-CreateRefreshTokensTable";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Role, User, RefreshToken],
  migrations: [
    CreateRolesTable1664103295889,
    CreateUsersTable1665137880643,
    AddRoleIdToUsersTable1665138325079,
    CreateRefreshTokensTable1665994923583,
  ],
});
