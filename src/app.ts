import express from "express";
import { config } from "./config";
import webhookRoutes from "./routes/webhook.routes";
import dummyRoutes from "./routes/dummy.routes";
import { connect } from "./db/mongodb";

const app = express();
app.use(express.json());

app.use("/webhooks", webhookRoutes);
app.use("/api/orders", dummyRoutes);

async function start() {
  await connect();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

start().catch(console.error);
