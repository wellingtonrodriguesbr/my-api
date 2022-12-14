import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { errors } from "celebrate";
import { routes } from "./routes";
import { AppError } from "@shared/errors/AppError";
import swaggerFile from "../../swagger.json";
import uploadConfig from "@config/upload";
import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);
app.use(errors());

// Middleware de erros da aplicação
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ status: "error", message: error.message });
  }

  return res.status(500).json({ status: "error", message: "Internal server error!" });
});

export { app };
