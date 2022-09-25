import { Role } from "@roles/entities/Role";
import { DataSource } from "typeorm";
import { CreateRolesTable1664103295889 } from "./migrations/1664103295889-CreateRolesTable";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Role],
  migrations: [CreateRolesTable1664103295889],
});