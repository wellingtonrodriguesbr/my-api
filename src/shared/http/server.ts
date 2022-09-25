import "dotenv/config";
import "reflect-metadata";

import { dataSource } from "@shared/typeorm";
import { app } from "./app";

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server is running!"));
  })
  .catch(err => console.log("Error initializing server", err));
