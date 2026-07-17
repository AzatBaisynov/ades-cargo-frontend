import { Button } from "../../../features/import-excel/ui/ButtonUni";

interface SummaryPanelProps {
  totalCount: number;
  totalPrice: number;
  onIssue: () => void;
  submitting: boolean;
}

export const SummaryPanel = ({
  totalCount,
  totalPrice,
  onIssue,
  submitting,
}: SummaryPanelProps) => {
  return (
    <div className="text-(--text-light) text-base">
      <div>
        Готово к выдаче товаров:{" "}
        <span className="rounded-full px-3 py-1 text-lg font-semibold text-green-700">
          {totalCount} шт.
        </span>
      </div>

      <div className="mt-3">
        Общая сумма:{" "}
        <span className="rounded-full px-3 py-1 text-lg font-semibold text-green-700">
          {totalPrice} сом
        </span>
      </div>

      <Button
        onClick={onIssue}
        disabled={submitting || totalCount === 0}
        className="w-full sm:w-auto px-8 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]"
      >
        {submitting ? "Оформление выдачи..." : "Выдать все товары"}
      </Button>
    </div>
  );
};