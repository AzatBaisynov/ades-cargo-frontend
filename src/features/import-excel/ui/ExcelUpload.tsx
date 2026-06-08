import { useRef, useState } from "react";
import { useAppDispatch } from '@/app/store/hooks';
import { uploadExcel } from '../model/excelThunk';
import "./ExcelUpload.css";

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
    alert("Можно загружать только Excel файлы (.xls, .xlsx)");
    return;
  }

  try {
    dispatch(uploadExcel(file)); 

  } catch (error) {
    console.error("Upload error:", error);
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
    <div className="excel-upload-wrapper">
    <div
  className={`excel-upload ${isDragging ? 'excel-upload--dragging' : ''}`}
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

  <div className="excel-upload__icon">
    ⬆
  </div>

  <p className="excel-upload__text">
    Перетащите файл excel или нажмите для выбора
  </p>
</div>
</div>
  );
};