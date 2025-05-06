import { ShopifyLineItem, ShopifyOrder } from "../types/shopify.types";

export function detectChanges(
  previousOrder: ShopifyOrder | null,
  currentOrder: ShopifyOrder,
): string[] {
  const changes: string[] = [];

  if (!previousOrder) {
    return ["new_order"];
  }

  // Compare line items
  if (!areLineItemsEqual(previousOrder.line_items, currentOrder.line_items)) {
    changes.push("line_items");
  }

  // Compare financial status
  if (previousOrder.financial_status !== currentOrder.financial_status) {
    changes.push("financial_status");
  }

  // Compare fulfillment status
  if (previousOrder.fulfillment_status !== currentOrder.fulfillment_status) {
    changes.push("fulfillment_status");
  }

  // Compare notes (handle null/undefined cases)
  const prevNote = previousOrder.note || "";
  const currNote = currentOrder.note || "";
  if (prevNote.trim() !== currNote.trim()) {
    changes.push("note");
  }

  return changes;
}

function areLineItemsEqual(
  prevItems: ShopifyLineItem[] = [],
  currItems: ShopifyLineItem[] = [],
): boolean {
  if (prevItems.length !== currItems.length) {
    return false;
  }

  // Create comparison keys for all items
  const prevKeys = prevItems.map((item) =>
    `${item.id}-${item.variant_id}-${item.quantity}`
  );
  const currKeys = currItems.map((item) =>
    `${item.id}-${item.variant_id}-${item.quantity}`
  );
  console.log(prevKeys);
  console.log(currKeys);

  // Compare sorted arrays to be order-independent
  return JSON.stringify(prevKeys.sort()) === JSON.stringify(currKeys.sort());
}
