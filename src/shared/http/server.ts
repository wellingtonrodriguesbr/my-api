import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World!" });
});

app.listen("3333", () => console.log("Server is running!"));
