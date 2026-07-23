export interface Product {
  id: string;
  customer_code: string;
  product_code: string;
  status: string;
  weight_Kg: number | null;
  current_price: number | null;
  total_price: number | null;
}
export interface NestApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
