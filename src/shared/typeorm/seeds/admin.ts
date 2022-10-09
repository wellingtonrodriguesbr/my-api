import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import { dataSource } from "..";

async function create() {
  const connection = await dataSource.initialize();
  const roleId = uuidV4();

  //create role
  await connection.query(`
  INSERT INTO roles(id, name)
  values('${roleId}', 'T.I.')
  `);

  //create user
  const userId = uuidV4();
  const password = await hash("123456789", 10);
  await connection.query(`
  INSERT INTO users(id, name, email, password, "isAdmin", roleId)
  values('${userId}', 'admin', 'ton@admin.com', '${password}', true, "${roleId}")
  `);

  await connection.destroy();
}

create().then(() => {
  console.log("User admin created.");
});
