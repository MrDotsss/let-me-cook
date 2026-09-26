import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

export const env = {
  ORIGINS: process.env.ORIGINS ? JSON.parse(process.env.ORIGINS) : [],
  DB_NAME: process.env.DB_NAME ?? "",
  DB_URL: process.env.DB_URL ?? "",
  BASE_URL: process.env.BASE_URL ?? "",
  PORT: process.env.PORT ?? 5500,
  AI_KEYS: process.env.AI_KEYS ? JSON.parse(process.env.AI_KEYS) : {},
  UNSPLASH_KEY: process.env.UNSPLASH_KEY ?? "",
};
