import React, { useState } from 'react';
import axios from 'axios';
import { ItemList, SummaryPanel } from '@/features/issuance';
import { SearchForm } from '@/features/issuance';

interface Product {
  id: string;
  customer_code: string;
  product_code: string;
  status: string;
  createdAt: string;
}
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const IssuePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentCustomerCode, setCurrentCustomerCode] = useState('');
  const [error, setError] = useState<string | null>(null);


  
const handleSearch = async (customer_code: string) => {
    setProducts([])
    setLoading(true);
    setError(null);
    setCurrentCustomerCode(customer_code);
    try {
        await delay(800)
      const response = await axios.get(`http://localhost:3000/product/search/${customer_code}`);
      setProducts(response.data);
    } catch (err) {
      setError('Ошибка при загрузке данных. Проверьте бэкенд.');
    } finally {
      setLoading(false);
    }
}

  const handleIssueAll = async () => {
    if (products.length === 0) return;

    setSubmitting(true);
    setError(null);
    try {
      const productIds = products.map((p) => p.id);

      await axios.patch('http://localhost:3000/product/status', {
        product_code: productIds, 
        status: 'Выдан', 
      });

      alert(`Успешно выдано товаров: ${products.length} шт.`);
            setProducts([]);
      setCurrentCustomerCode('');
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
          onIssue={handleIssueAll}
          submitting={submitting}
        />
      )}
    </div>
  );
}

export default IssuePage