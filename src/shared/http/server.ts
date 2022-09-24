import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "@shared/errors/AppError";
import swaggerFile from "../../swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

// Middleware de erros da aplicação
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ status: "error", message: error.message });
  }

  return res.status(500).json({ status: "error", message: "Internal server error!" });
});

app.listen(process.env.PORT, () => console.log("Server is running!"));
