import { useMemo, useRef, useState } from "react";
import { X, Save } from "lucide-react";
import { api } from "@/shared/api/endpoints";
import { ProductInputCard } from "@/pages/ProductPage/ui/ProductInputCard";
import { ProductSuccessful } from "@/pages/ProductPage/ui/ProductSuccesful";
interface TableRow {
  customerCode: string;
  productCode: string;
  weight: string;
}
const ProductsPage = () => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [customerCode, setCustomerCode] = useState("");
  const [productCode, setProductCode] = useState("");
  const [weight, setWeight] = useState("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const customerRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const normalize = (v: string) => v.trim().toLowerCase();
  const duplicateMap = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}-${normalize(row.weight)}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [rows]);
  const productDuplicateMap = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [rows]);
  const isDuplicate = (row: TableRow) => {
    const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}-${normalize(row.weight)}`;
    return duplicateMap[key] > 1;
  };
  const isProductDuplicate = (row: TableRow) => {
    const key = `${normalize(row.customerCode)}-${normalize(row.productCode)}`;
    return productDuplicateMap[key] > 1;
  };
  const hasExactDuplicates = Object.values(duplicateMap).some(
    (count) => count > 1
  );
  const hasProductDuplicates = Object.values(productDuplicateMap).some(
    (count) => count > 1
  );
  const addRow = () => {
    if (!customerCode || !productCode || !weight) return;
    setRows((prev) => [...prev, { customerCode, productCode, weight }]);
    setCustomerCode("");
    setProductCode("");
    setWeight("");
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
        })),
      };
      const { data } = await api.post("/product/acceptance", payload);

      setSavedCount(data.saved);
      setRows([]);
      setIsSuccessOpen(true);
    } catch (error) {
     alert("Ошибка сохранения данных")
    }
  };
  return (
    <div className="space-y-6">
      {" "}
      <div className="mb-6">
        {" "}
        <h2 className="text-2xl font-bold text-gray-800">
          {" "}
          Приёмка товара{" "}
        </h2>{" "}
        <p className="mt-1 text-gray-500">
          {" "}
          Отсканируйте штрих-код и введите данные{" "}
        </p>{" "}
      </div>{" "}
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
      />{" "}
      {hasExactDuplicates && (
        <div className="mx-4 mt-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm text-yellow-700">
          {" "}
          ⚠️ Есть полностью одинаковые записи{" "}
        </div>
      )}{" "}
      {hasProductDuplicates && (
        <div className="mx-4 mt-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700">
          {" "}
          ⚠️ Есть одинаковые клиент + товар (возможно повторная поставка){" "}
        </div>
      )}{" "}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {" "}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          {" "}
          <h3 className="text-lg font-semibold text-gray-700">
            {" "}
            Недавно добавленные{" "}
          </h3>{" "}
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {" "}
            {rows.length} товаров{" "}
          </span>{" "}
        </div>{" "}
        <table className="w-full text-center">
          {" "}
          <thead>
            {" "}
            <tr className="bg-gray-50">
              {" "}
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                {" "}
                №{" "}
              </th>{" "}
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                {" "}
                Код клиента{" "}
              </th>{" "}
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                {" "}
                Код товара{" "}
              </th>{" "}
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                {" "}
                Вес, кг{" "}
              </th>{" "}
              <th className="px-4 py-3"></th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {rows.map((row, index) => (
              <tr
                key={`${row.customerCode}-${row.productCode}-${row.weight}-${index}`}
                className={` ${isDuplicate(row) ? "bg-yellow-200" : ""} ${isProductDuplicate(row) ? "border-l-4 border-orange-400 bg-orange-200" : ""} `}
              >
                {" "}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {" "}
                  {index + 1}{" "}
                </td>{" "}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {" "}
                  {row.customerCode}{" "}
                </td>{" "}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {" "}
                  {row.productCode}{" "}
                </td>{" "}
                <td className="px-4 py-3 text-sm text-gray-700">
                  {" "}
                  {row.weight}{" "}
                </td>{" "}
                <td className="px-4 py-3">
                  {" "}
                  <button
                    onClick={() => removeRow(index)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-100"
                  >
                    {" "}
                    <X className="h-4 w-4" />{" "}
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      <div className="flex justify-end">
        {" "}
        <button
          onClick={handleSave}
          disabled={!rows.length}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {" "}
          <Save className="h-5 w-5" /> Сохранить{" "}
        </button>{" "}
      </div>{" "}
      <ProductSuccessful
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        count={savedCount}
      />
    </div>
  );
};
export default ProductsPage;
