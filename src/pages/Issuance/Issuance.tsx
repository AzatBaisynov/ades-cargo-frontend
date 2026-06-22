import axios from 'axios';
import { ItemList, SummaryPanel } from '@/features/issuance';
import { SearchForm } from '@/features/issuance';
import { useState } from 'react';

interface Product {
  id: string;
  customer_code: string;
  product_code: string;
  status: string;
  createdAt: string;
}

export const IssuePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL=import.meta.env.BASE_URL
  
const handleSearch = async (customer_code: string) => {
    setProducts([])
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/product/search/${customer_code}`);
      setProducts(response.data);
    } catch (err) {
      setError('Ошибка при загрузке данных. Проверьте бэкенд.');
    } finally {
      setLoading(false);
    }
}
  const handleGiveOutProducts = async () => {
    if (products.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const productIds = products.map((p) => p.id);
      await axios.patch(`${BASE_URL}/product/status`, {
        product_code: productIds, 
        status: 'Выдан', 
      });
      alert(`Успешно выдано товаров: ${products.length} шт.`);
         setProducts([]);
    } catch (err) {
      setError('Не удалось обновить статус товаров.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Выдача товаров со склада</h1>
      <SearchForm onSearch={handleSearch} loading={loading} />
      {error && (
        <div className="mb-4 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      <ItemList products={products} />
      {products.length > 0 && (
        <SummaryPanel
          totalCount={products.length}
          onIssue={handleGiveOutProducts}
          submitting={submitting}
        />
      )}
    </div>
  );
}

export default IssuePage