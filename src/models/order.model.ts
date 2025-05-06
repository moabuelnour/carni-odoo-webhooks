import { Db, MongoClient, WithId } from "mongodb";
import { ShopifyLineItem, ShopifyOrder } from "../types/shopify.types";

let db: Db;

export async function init(client: MongoClient): Promise<void> {
  db = client.db("shopify_orders");
  await db.collection("orders").createIndex({ id: 1 }, { unique: true });
}

export async function findOrderById(
  id: number,
): Promise<WithId<ShopifyOrder> | null> {
  return db.collection<ShopifyOrder>("orders").findOne({ id });
}

export async function saveOrder(order: ShopifyOrder): Promise<void> {
  // Deep clone and normalize the order
  const orderToSave = JSON.parse(JSON.stringify(order));

  // Ensure line_items is a proper array
  orderToSave.line_items = Array.isArray(order.line_items)
    ? order.line_items.map(normalizeLineItem)
    : [];

  // Convert dates if they're strings
  if (typeof orderToSave.created_at === "string") {
    orderToSave.created_at = new Date(orderToSave.created_at);
  }
  if (typeof orderToSave.updated_at === "string") {
    orderToSave.updated_at = new Date(orderToSave.updated_at);
  }

  // console.log("Saving order:", JSON.stringify(orderToSave, null, 2)); // Debug log

  await db.collection<ShopifyOrder>("orders").updateOne(
    { id: order.id },
    { $set: orderToSave },
    { upsert: true },
  );
}

function normalizeLineItem(item: any): ShopifyLineItem {
  return {
    id: Number(item.id),
    variant_id: Number(item.variant_id),
    title: String(item.title || ""),
    quantity: Number(item.quantity),
    price: String(item.price),
    // Add other properties as needed
    ...item, // Include any additional properties
  };
}
