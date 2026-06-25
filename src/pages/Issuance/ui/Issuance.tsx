import axios from 'axios';
import { ItemList } from '@/widgets/issuance-panel/ui/Item-list';
import { SummaryPanel } from '@/widgets/issuance-panel/ui/Summary-panel';
import { SearchForm } from '@/widgets/issuance-panel/ui/Search-form';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

interface Product {
  id: string;
  customer_code: string;
  product_code: string;
  status: string;
  createdAt: string;
}
interface NestApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export const IssuePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCode,setSearchCode] = useState<string>('')
  const BASE_URL=import.meta.env.VITE_BASE_URL
  
const handleSearch = async (customer_code: string) => {
    setProducts([])
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/product/search/${customer_code}`);
      setProducts(response.data);
    } catch (err) {
      if( axios.isAxiosError<NestApiError>(err) && err.response?.data){
        const backendMessage = err.response.data.message

        if(Array.isArray(backendMessage)){
          setError(backendMessage.join(', '))
        }else{
          setError(backendMessage|| 'Произошла непредвиденная ошибка на сервере.')
        }
      } else{
        setError('Не удалось связаться с сервером. Проверьте подключение к сети.')
      }
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
      toast.success(`Успешно выдано товаров: ${products.length} шт.`)
         setProducts([]);
         setSearchCode('')
    } catch (err) {
      if(axios.isAxiosError<NestApiError>(err) && err.response?.data.message){
        const backendMassage = err.response.data.message
        if(Array.isArray(backendMassage)){
          setError(backendMassage.join(', '))
        }else{
        setError(backendMassage)}
      }else {
      setError('Не удалось обновить статус товаров.');
    }} finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Toaster 
      position="top-right"
      toastOptions={{
        success: {
          duration: 4000,
        }}}
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Выдача товаров со склада</h1>
      <SearchForm onSearch={handleSearch} loading={loading} code={searchCode} setCode={setSearchCode} />
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