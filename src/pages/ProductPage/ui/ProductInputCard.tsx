import type { RefObject } from "react";
import { Plus, QrCode } from "lucide-react";

interface ProductInputCardProps {
  customerCode: string;
  productCode: string;
  weight: string;
  customerRef: RefObject<HTMLInputElement>;
  productRef: RefObject<HTMLInputElement>;
  weightRef: RefObject<HTMLInputElement>;
  onChangeCustomer: (value: string) => void;
  onChangeProduct: (value: string) => void;
  onChangeWeight: (value: string) => void;
  onAdd: () => void;
  onCustomerEnter?: () => void;
  onProductEnter?: () => void;
  onWeightEnter?: () => void;
}

export const ProductInputCard = ({
  customerCode,
  productCode,
  weight,
  customerRef,
  productRef,
  weightRef,
  onChangeCustomer,
  onChangeProduct,
  onChangeWeight,
  onAdd,
  onCustomerEnter,
  onProductEnter,
  onWeightEnter,
}: ProductInputCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-md shadow-green-500/20">
          <QrCode className="h-5 w-5 text-white" />
        </div>

        <h3 className="text-lg font-semibold text-gray-700">Новый товар</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          ref={customerRef}
          type="text"
          placeholder="Код клиента"
          value={customerCode}
          onChange={(e) => onChangeCustomer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onCustomerEnter?.();
          }}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />

        <input
          ref={productRef}
          type="text"
          placeholder="Код товара"
          value={productCode}
          onChange={(e) => onChangeProduct(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onProductEnter?.();
          }}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />

        <input
          ref={weightRef}
          type="text"
          inputMode="decimal"
          placeholder="Вес, кг"
          value={weight}
          onChange={(e) => onChangeWeight(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onWeightEnter?.();
          }}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-md shadow-green-500/25 transition-all hover:from-green-600 hover:to-emerald-600"
        >
          <Plus className="h-5 w-5" />
          Добавить товар
        </button>
      </div>
    </div>
  );
};
