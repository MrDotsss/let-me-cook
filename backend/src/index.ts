import { env } from "./config/env.config.js";
import { checkDbConnection, dbClient } from "./db/client.db.js";
import app from "./server.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]); // Uses Cloudflare and Google DNS

await checkDbConnection();

const server = app.listen(5500, () => {
  console.log(`🚀 Server listening to: ${env.BASE_URL}:${env.PORT}/api\n`);
  console.log("-------------------------------------------------------");
});

const shutdown = async (signal: string) => {
  console.log(`${signal} received. Shutting down...`);

  // Stop accepting new connections and wait for existing requests.
  server.close(async () => {
    console.log("HTTP server closed");

    try {
      // Close DB connection
      await dbClient.close();
      console.log("Cleanup complete");
      process.exit(0);
    } catch (error) {
      console.error("Cleanup failed:", error);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
