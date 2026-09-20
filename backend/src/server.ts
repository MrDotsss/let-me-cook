import express, { type Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/cors.config.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app: Express = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.use(cookieParser());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Let Me Cook API Server" });
});

export default app;
