import { useRef, useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { uploadExcel } from "../../../features/import-excel/model/excelThunk";
import { toast } from "react-toastify";
import { Upload } from "lucide-react";

interface Props {
  isUploaded: boolean;
  setIsUploaded: (value: boolean) => void;
}

export const ExcelUpload = ({ isUploaded, setIsUploaded }: Props) => {
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

    if (isUploaded) {
      toast.warning("Файл уже был загружен. Повторная загрузка запрещена.");
      return;
    }

    if (!isExcelFile(file)) {
      toast.error("Можно загружать только Excel файлы (.xls, .xlsx)");
      return;
    }

    try {
      const result = await dispatch(uploadExcel(file));

      if (uploadExcel.fulfilled.match(result)) {
        setIsUploaded(true);
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
  if (isUploaded) {
    toast.warning("Файл уже загружен");
    return;
  }

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
  <div className="w-full max-w-275 rounded-2xl border border-gray-200 bg-(--bg-light) p-6 shadow-sm">
  <div className="mb-4 flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-700">
      Загрузка файла
    </h3>
  </div>

 <div
  className={`flex items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all bg-gray-100 ${
    isUploaded
      ? "cursor-not-allowed opacity-60 border-gray-200"
      : isDragging
      ? "border-green-300 bg-green-100"
      : "border-gray-300 hover:border-green-100 hover:bg-green-50/50"
  }`}
  onClick={() => {
    if (isUploaded) {
      toast.warning("Файл уже загружен");
      return;
    }
    handleClick();
  }}
  onDragOver={(e) => {
    if (isUploaded) return;
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={() => setIsDragging(false)}
  onDrop={(e) => {
    if (isUploaded) {
      toast.warning("Файл уже загружен");
      return;
    }
    handleDrop(e);
  }}
>
  <input
  ref={inputRef}
  type="file"
  accept=".xls,.xlsx"
  onChange={handleChange}
  hidden
/>

    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
      <Upload className="h-6 w-6 text-green-600" />
    </div>

    <div>
      <p className="font-medium text-gray-700">
        Выберите Excel файл
      </p>

      <p className="text-sm text-gray-400">
        или перетащите сюда
      </p>
    </div>
  </div>
</div>
    </div>
  );
};