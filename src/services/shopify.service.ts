import crypto from "crypto";
import { config } from "../config";

export function verifyWebhook(payload: string, hmacHeader: string): boolean {
  const hmac = crypto
    .createHmac("sha256", config.shopifySecret)
    .update(payload)
    .digest("base64");
  return hmac === hmacHeader;
}
