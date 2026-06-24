interface ImportSuccessfulProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export const ImportSuccessful = ({ isOpen, onSuccess }: ImportSuccessfulProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center  `z-9999`" onClick={onSuccess}>
      <div
        className="relative `bg-(--text-light)` p-8 w-[320px] max-w-sm rounded-2xl text-center shadow-xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 py-2 px-4 `text-(--bg-dark)` text-xl cursor-pointer"
          onClick={onSuccess}
        >
          x
        </button>
        <div className="flex flex-col justify-center items-center text-center w-full mt-6 px-6">
          <p className="font-regular text-[#111827] mb-2">Товары успешно импортированы!</p>
          <p className="text-sm text-[#111827]">Статус: На складе в Китае</p>
        </div>
      </div>
    </div>
  );
};