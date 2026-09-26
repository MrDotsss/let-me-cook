import { MongoClient } from "mongodb";
import { env } from "../config/env.config.js";

const dbClient = new MongoClient(env.DB_URL);
const database = dbClient.db(env.DB_NAME);

const checkDbConnection = async () => {
  try {
    console.log("🔃 Connecting to database.");
    await dbClient.connect();
    console.log("✅ Successfully connected to the database.");
  } catch (error) {
    console.error("❌ Could not connect to the database:", error);
    process.exit(1);
  }
};

export { database, dbClient, checkDbConnection };
