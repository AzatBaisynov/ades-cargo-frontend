import { useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { api } from "@/shared/api/endpoints";
import { ProductInputCard } from "@/pages/ProductPage/ui/ProductInputCard";
import { ProductPriceCard } from "@/pages/ProductPage/ui/ProductPriceCard";

interface TableRow {
  customerCode: string;
  productCode: string;
  weight: string;
  pricePerKg: string;
}

const ProductsPage = () => {
  const [customerCode, setCustomerCode] = useState("");
  const [productCode, setProductCode] = useState("");
  const [weight, setWeight] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [rows, setRows] = useState<TableRow[]>([]);

  const customerRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);

  const normalize = (v: string) => v.trim().toLowerCase();

  const duplicateMap = useMemo(() => {
    return rows.reduce((acc, row) => {
      const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}-${normalize(row.weight)}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [rows]);

  
  const productDuplicateMap = useMemo(() => {
    return rows.reduce((acc, row) => {
      const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [rows]);

  const isDuplicate = (row: TableRow) => {
    const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}-${normalize(row.weight)}`;
    return duplicateMap[key] > 1;
  };

  const isProductDuplicate = (row: TableRow) => {
    const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}`;
    return productDuplicateMap[key] > 1;
  };

  const hasExactDuplicates = Object.values(duplicateMap).some((c) => c > 1);
  const hasProductDuplicates = Object.values(productDuplicateMap).some((c) => c > 1);

  const addRow = () => {
    if (!customerCode || !productCode || !weight || !pricePerKg) return;

    setRows((prev) => [
      ...prev,
      { customerCode, productCode, weight, pricePerKg },
    ]);

    setCustomerCode("");
    setProductCode("");
    setWeight("");
    setPricePerKg("");

    customerRef.current?.focus();
  };

  const removeRow = (indexToRemove: number) => {
    setRows((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    if (!rows.length) return;

    try {
      const payload = {
        items: rows.map((row) => ({
          customer_code: row.customerCode.trim(),
          product_code: row.productCode.trim(),
          weight_Kg: Number(row.weight.replace(",", ".")),
          price_per_kg: Number(row.pricePerKg.replace(",", ".")),
        })),
      };

      const { data } = await api.post("/product/acceptance", payload);

      alert(`Сохранено ${data.count} товаров`);
      setRows([]);
    } catch (error) {
      alert("Ошибка сохранения");
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Приёмка товара
        </h2>
        <p className="mt-1 text-gray-500">
          Отсканируйте штрих-код и введите данные
        </p>
      </div>

      {/* INPUT BLOCK */}
      <ProductInputCard
        customerCode={customerCode}
        productCode={productCode}
        weight={weight}
        customerRef={customerRef}
        productRef={productRef}
        weightRef={weightRef}
        onChangeCustomer={setCustomerCode}
        onChangeProduct={setProductCode}
        onChangeWeight={(value) => setWeight(value.replace(/[^0-9.,]/g, ""))}
        onAdd={addRow}
        onCustomerEnter={() => productRef.current?.focus()}
        onProductEnter={() => weightRef.current?.focus()}
        onWeightEnter={addRow}
      />

      <ProductPriceCard
        pricePerKg={pricePerKg}
        onChangePricePerKg={(value) => setPricePerKg(value.replace(/[^0-9.,]/g, ""))}
        onPriceEnter={addRow}
        onSave={handleSave}
        disabled={!rows.length}
      />

      {hasExactDuplicates && (
        <div className="mx-4 mt-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm text-yellow-700">
          ⚠️ Есть полностью одинаковые записи
        </div>
      )}

      {hasProductDuplicates && (
        <div className="mx-4 mt-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700">
          ⚠️ Есть одинаковые клиент + товар (возможно повторная поставка)
        </div>
      )}

     
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">
            Недавно добавленные
          </h3>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {rows.length} товаров
          </span>
        </div>

        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                №
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Код клиента
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Код товара
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Вес, кг
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Цена, сом/кг
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.customerCode}-${row.productCode}-${row.weight}-${index}`}
                className={`
                  ${isDuplicate(row) ? "bg-yellow-200" : ""}
                  ${isProductDuplicate(row) ? "bg-orange-200 border-l-4 border-orange-400" : ""}
                `}
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.customerCode}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.productCode}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.weight}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.pricePerKg}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => removeRow(index)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default ProductsPage;