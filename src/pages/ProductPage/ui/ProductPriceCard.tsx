interface ProductPriceCardProps {
  pricePerKg: string;
  onChangePricePerKg: (value: string) => void;
  onPriceEnter?: () => void;
  onSave: () => void;
  disabled?: boolean;
}

export const ProductPriceCard = ({
  pricePerKg,
  onChangePricePerKg,
  onPriceEnter,
  onSave,
  disabled = false,
}: ProductPriceCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Цена за кг</h3>
        <p className="mt-1 text-sm text-gray-500">
          Укажите цену в сомах на килограмм товара.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <input
          type="text"
          inputMode="decimal"
          placeholder="Цена, сом/кг"
          value={pricePerKg}
          onChange={(e) => onChangePricePerKg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onPriceEnter?.();
          }}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />

        <button
          onClick={onSave}
          disabled={disabled}
          className="h-full rounded-xl bg-linear-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-md shadow-green-500/25 transition-all hover:from-green-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
