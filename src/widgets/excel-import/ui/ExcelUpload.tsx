import { useRef, useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { uploadExcel } from "../../../features/import-excel/model/excelThunk";
import { toast } from "react-toastify";


export const ExcelUpload = () => {
  
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isExcelFile = (file: File) => {
    return (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls")
    );
  };

  const handleFile = async (file?: File) => {
    if (!file) return;

    if (!isExcelFile(file)) {
      toast.error("Можно загружать только Excel файлы (.xls, .xlsx)");
      return;
    }

    try {
      const result = await dispatch(uploadExcel(file));

      if (uploadExcel.fulfilled.match(result)) {
        toast.success("Файл успешно загружен");
      }

      if (uploadExcel.rejected.match(result)) {
        toast.error("Файл не загружен");
      }
    } catch {
      toast.error("Файл не загружен");
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
  <div className="mt-10 flex justify-center">
    <div
      className={`flex min-h-[220px] w-full max-w-[1200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[var(--bg-light)] text-[var(--text-dark)] transition-all duration-200
        ${
          isDragging
            ? 'border-[var(--bg-dark)] shadow-md'
            : 'border-gray-300 hover:-translate-y-[1px] hover:border-[var(--bg-dark)]'
        }`}
      onClick={handleClick}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xls,.xlsx"
        onChange={handleChange}
        hidden
      />

      <div className="mb-2 text-3xl text-[var(--bg-dark)]">
        ⬆
      </div>

      <p className="mt-2 text-sm text-[var(--text-dark)]">
        Перетащите файл excel или нажмите для выбора
      </p>
    </div>
  </div>
);
};