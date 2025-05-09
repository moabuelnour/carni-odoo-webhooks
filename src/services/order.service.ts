import axios from "axios";
import { config } from "../config";
import { detectChanges } from "../utils/detectChanges";
import { findOrderById, saveOrder } from "../models/order.model";

export async function processOrderUpdate(order: any) {
  const orderId = order.id;
  console.log("Recieved Order: " + orderId);
  const previousOrder = await findOrderById(orderId);
  const changes = detectChanges(previousOrder, order);
  await saveOrder(order);
  if (changes.length > 0) {
    await axios.post(config.downstreamUrl, order);
    console.log(
      `Forwarded order ${orderId} with changes: ${changes.join(", ")}`,
    );
  } else {
    console.log(`No relevant changes for order ${orderId}`);
  }
}
