import axios from 'axios';
import { Button } from './button';
import { useState } from 'react';

interface ImportChinaButtonProps {
  previewData: Array<{ customer_code: string; product_code: string }>;
  onSuccess?: () => void;
}

export const ImportChinaButton: React.FC<ImportChinaButtonProps> = ({ previewData, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!previewData || previewData.length === 0) {
      alert('Ошибка: Выберите файл для импорта!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/product/import-china',
        previewData,
      );

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message || 'Успешно импортировано!');
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
        className="font-(--fontweight-regular) min-w-37.5"
        isLoading= {loading}
        >
  import
         </Button>
  );
};