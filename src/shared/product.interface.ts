export interface Product {
  id: string;
  customer_code: string;
  product_code: string;
  status: string;
  createdAt: string;
}
export interface NestApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
