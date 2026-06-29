import axios from "axios";
import type { NestApiError } from "../product.interface";

export const getErrorMessage = (err: unknown) => {
  const errorMessage = "Произошла непредвиденная ошибка на сервере.";
  if (!axios.isAxiosError<NestApiError>(err)) {
    return err instanceof Error ? err.message : errorMessage;
  }
  if (err.response?.data) {
    const { message } = err.response.data;
    if (Array.isArray(message)) {
      return message.join(". ");
    }
    return message || `Ошибка сервера: ${err.response.status}`;
  }
  if (err.request) {
    return "Не удалось связаться с сервером. Проверьте интернет-соединение.";
  }
  return err.message;
};
