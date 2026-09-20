import { env } from "./config/env.config.js";
import { checkDbConnection } from "./db/client.db.js";
import app from "./server.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]); // Uses Cloudflare and Google DNS

await checkDbConnection();

app.listen(5500, () => {
  console.log(`🚀 Server listening to: ${env.BASE_URL}:${env.PORT}/api\n`);
  console.log("-------------------------------------------------------");
});
