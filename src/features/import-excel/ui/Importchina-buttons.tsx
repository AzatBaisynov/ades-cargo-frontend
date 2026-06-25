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
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/product/import-china`, previewData

      );

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
        className="font-(--fontweight-regular) min-w-37.5 absolute right-7"
        isLoading= {loading}
        >
        Импортировать
      </Button>
  );
};