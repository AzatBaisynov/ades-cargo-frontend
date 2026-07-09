import { CheckCircle, X } from "lucide-react";

interface ImportSuccessfulProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export const ImportSuccessful = ({
  isOpen,
  onSuccess,
}: ImportSuccessfulProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onSuccess}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onSuccess}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <CheckCircle
              size={36}
              className="text-green-600"
            />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-gray-800">
            Импорт завершён
          </h3>

          <p className="mb-2 text-gray-600">
            Товары успешно импортированы
          </p>

          <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
            Статус:{" "}
            <span className="font-medium text-green-600">
              На складе в Китае
            </span>
          </div>

          <button
            onClick={onSuccess}
            className="mt-6 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-green-600 hover:to-emerald-600"
          >
            Отлично
          </button>
        </div>
      </div>
    </div>
  );
};