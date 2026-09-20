import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { database, dbClient } from "../db/client.db.js";
import { env } from "../config/env.config.js";

export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client: dbClient,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: `${env.BASE_URL}:${env.PORT}`,
  advanced: {
    database: {
      joins: true,
    },
  },
});
