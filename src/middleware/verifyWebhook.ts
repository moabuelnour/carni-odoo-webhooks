import { NextFunction, Request, Response } from "express";
import { verifyWebhook } from "../services/shopify.service";

export function verifyWebhookMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const hmacHeader = req.get("X-Shopify-Hmac-Sha256") || "";
  const body = JSON.stringify(req.body);

  //TEMP: Disabled Middleware
  // if (!verifyWebhook(body, hmacHeader)) {
  //   res.status(401).send("Invalid webhook signature");
  //   return;
  // }

  next();
}
