import type { CorsOptions } from "cors";
import { env } from "./env.config.js";

export const corsOptions: CorsOptions = {
  origin: [...env.ORIGINS],
  credentials: true,
};
