// src/utils.ts
function detectChanges(previousOrder: any, currentOrder: any): string[] {
  const changes: string[] = [];

  if (!previousOrder) {
    return ["new_order"]; // New order, treat as significant change
  }

  // Compare line items
  const prevItems = JSON.stringify(previousOrder.line_items || []);
  const currItems = JSON.stringify(currentOrder.line_items || []);
  if (prevItems !== currItems) {
    changes.push("line_items");
  }

  // Compare order status
  if (previousOrder.financial_status !== currentOrder.financial_status) {
    changes.push("financial_status");
  }

  // Compare payment status
  if (previousOrder.fulfillment_status !== currentOrder.fulfillment_status) {
    changes.push("fulfillment_status");
  }

  // Compare notes
  if (previousOrder.note !== currentOrder.note) {
    changes.push("note");
  }

  return changes;
}

export { detectChanges };
