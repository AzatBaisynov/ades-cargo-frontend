import { CheckCircle, X } from "lucide-react";

interface PriceSuccessfulProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceSuccessful = ({
  isOpen,
  onClose,
}: PriceSuccessfulProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <CheckCircle size={36} className="text-green-600" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-gray-800">
            Цена обновлена
          </h3>

          <p className="text-gray-600">
            Новая цена за 1 кг успешно сохранена
          </p>

          <button
            onClick={onClose}
            className="mt-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-medium text-white"
          >
            Отлично
          </button>

        </div>
      </div>
    </div>
  );
};