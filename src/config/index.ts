import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017",
  shopifySecret: process.env.SHOPIFY_WEBHOOK_SECRET || "",
  downstreamUrl: process.env.DOWNSTREAM_URL ||
    "https://your-other-server.com/api/orders",
  port: parseInt(process.env.PORT || "3000", 10),
};
