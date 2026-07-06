import axios from 'axios';
import { useState } from 'react';
import { Button } from './ButtonUni';

interface ImportChinaButtonProps {
  previewData: Array<{ customer_code: string; product_code: string }>;
  onSuccess?: () => void;
}
export const ImportChinaButton = ({ previewData, onSuccess }: ImportChinaButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!previewData || previewData.length === 0) {
      alert('Ошибка: Выберите файл для импорта!');
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/product/import-china`, previewData);

      if (response.status === 200 || response.status === 201) {
        onSuccess?.();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        const errorMessage = Array.isArray(serverMessage)
          ? serverMessage.join(', ')
          : serverMessage || 'Произошла ошибка при импорте';

        alert(`Ошибка сервера: ${errorMessage}`);
      } else {
        alert('Произошла непредвиденная ошибка клиента');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
     <Button
  onClick={handleImport}
  disabled={previewData.length === 0 || loading}
  isLoading={loading}
  className="
    min-w-[150px]
    rounded-xl
    px-5
    py-2.5
    text-[var(--fs-base)]
    font-[var(--font-weight-regular)]
    text-white
    bg-[var(--bg-dark)]
    hover:opacity-90
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition-all
    duration-200
  "
>
  Импортировать
</Button>
  );
};