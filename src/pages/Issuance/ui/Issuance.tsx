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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 4000,
          },
        }}
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Выдача товаров со склада
      </h1>
      <SearchForm
        onSearch={handleSearch}
        loading={loading}
        code={searchCode}
        setCode={setSearchCode}
      />
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
};

export default IssuePage;
