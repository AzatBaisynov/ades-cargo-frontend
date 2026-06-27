import { Package, User } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  customer_code: string;
  product_code: string;
  status: string;
  createdAt: string;
}

interface ItemListProps {
  products: Product[];
}
export const ItemList = ({ products }: ItemListProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  if (products.length === 0) {
    return null;
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">
          Результаты поиска
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({products.length})
          </span>
        </h3>
      </div>
      <div className="grid gap-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-gray-50 rounded-xl p-4 border-2 transition-all cursor-pointer ${selectedItem?.id === product.id ? 'border-green-400 ring-2 ring-green-100' : 'border-transparent hover:border-gray-200'}`}
            onClick={() =>
              setSelectedItem(selectedItem?.id === product.id ? null : product)
            }
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      product.status === 'Прибыл в Бишкек'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {product.status === 'Прибыл в Бишкек'
                      ? 'Прибыл в Бишкек'
                      : 'Выдан'}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Код товара</p>
                      <p className="text-sm text-gray-700 font-mono">
                        {product.product_code}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Код клиента</p>
                      <p className="text-sm text-gray-700 font-mono">
                        {product.customer_code}
                      </p>
                    </div>
                  </div>

                  {/*
                   TODO:  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Scale className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Вес</p>
                      <p className="text-sm text-green-600 font-semibold">
                        {product.weight} кг
                      </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <BadgeEuro className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Цена</p>
                      <p className="text-sm text-gray-700 font-mono">
                        {product.price}
                      </p>
                    </div>
                  </div>
                   */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
