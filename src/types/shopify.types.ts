export interface ShopifyLineItem {
  id: number;
  variant_id: number | null;
  title: string;
  quantity: number;
  current_quantity: number;
  sku: string;
  variant_title: string | null;
  vendor: string | null;
  fulfillment_service: string;
  product_id: number | null;
  requires_shipping: boolean;
  taxable: boolean;
  gift_card: boolean;
  pre_tax_price: string;
  price: string;
  grams: number;
  tax_lines: {
    title: string;
    price: string;
    rate: number;
  }[];
  duties: any[]; // Replace 'any' with proper type if needed
  discount_allocations: {
    amount: string;
    discount_application_index: number;
  }[];
  properties: {
    name: string;
    value: string;
  }[];
  product_exists?: boolean;
  fulfillable_quantity?: number;
  name?: string;
  total_discount?: string;
  fulfillment_status?: string | null;
  // Add any other line item properties you need
}

export interface ShopifyOrder {
  id: number;
  email: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  closed_at: string | Date | null;
  number: number;
  note: string | null;
  token: string;
  gateway: string;
  test: boolean;
  total_price: string;
  subtotal_price: string;
  total_weight: number;
  total_tax: string;
  taxes_included: boolean;
  currency: string;
  note_attributes: NoteAttribute[];
  financial_status: string;
  fulfillment_status: string | null;
  line_items: ShopifyLineItem[];
  shipping_lines: {
    title: string;
    price: string;
    code: string;
    source: string;
    phone: string | null;
    requested_fulfillment_service_id: string | null;
    delivery_category: string | null;
    carrier_identifier: string | null;
    tax_lines: {
      title: string;
      price: string;
      rate: number;
    }[];
  }[];
  // Add any other order properties you need
}

export interface NoteAttribute {
  name: string;
  value: string;
}
