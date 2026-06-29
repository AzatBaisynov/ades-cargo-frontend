import { ItemList } from "@/widgets/issuance-panel/ui/Item-list";
import { SummaryPanel } from "@/widgets/issuance-panel/ui/Summary-panel";
import { SearchForm } from "@/widgets/issuance-panel/ui/Search-form";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { Product } from "@/shared/product.interface";
import { getErrorMessage } from "@/shared/api/axios";
import { api } from "@/shared/api/endpoints";

export const IssuePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState<string>("");

  const handleSearch = async (customer_code: string) => {
    setProducts([]);
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Product[]>(
        `/product/search/${customer_code}`
      );
      setProducts(data);
    } catch (error) {
      const msg = getErrorMessage(error);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  const handleGiveOutProducts = async () => {
    if (products.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const productIds = products.map((p) => p.id);
      await api.patch("/product/status", {
        product_code: productIds,
        status: "Выдан",
      });
      toast.success(`Успешно выдано товаров: ${products.length} шт.`);
      setProducts([]);
      setSearchCode("");
    } catch (error) {
      const msg = getErrorMessage(error);
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              duration: 4000,
            },
          }}
        />
        <h2 className="text-2xl font-bold text-gray-800">Поиск и выдача</h2>
        <p className="text-gray-500 mt-1">Найдите товар и выдайте клиенту</p>
      </div>
      <div className="bg-(--bg-darck) rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-green-500/20">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Поиск товара</h3>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <SearchForm
              onSearch={handleSearch}
              loading={loading}
              code={searchCode}
              setCode={setSearchCode}
            />
          </div>
        </div>
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}
        <ItemList
          key={products.map((p) => p.id).join(',')}
          products={products}
        />
        {products.length > 0 && (
          <SummaryPanel
            totalCount={products.length}
            onIssue={handleGiveOutProducts}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
};

export default IssuePage;
