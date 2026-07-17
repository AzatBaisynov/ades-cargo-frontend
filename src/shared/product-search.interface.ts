import type { Product } from "./product.interface";

export interface ProductSearchResponse {
  products: Product[];
  client_total_price: number;
}