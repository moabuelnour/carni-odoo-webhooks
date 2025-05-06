import { MongoClient } from "mongodb";
import { config } from "../config";
import * as OrderModel from "../models/order.model";

const client = new MongoClient(config.mongoUri);

export async function connect() {
  await client.connect();
  console.log("Connected to MongoDB");
  await OrderModel.init(client);
}

export function getClient() {
  return client;
}
