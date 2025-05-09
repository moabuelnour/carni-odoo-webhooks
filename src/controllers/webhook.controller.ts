import { Request, Response } from "express";
import { ShopifyOrder } from "../types/shopify.types";
import * as OrderService from "../services/order.service";

export async function handleOrderUpdate(
  req: Request,
  res: Response,
): Promise<void> {
  const order: ShopifyOrder = req.body;
  try {
    await OrderService.processOrderUpdate(order);
    res.status(200).send("Webhook processed");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Internal server error");
  }
}
