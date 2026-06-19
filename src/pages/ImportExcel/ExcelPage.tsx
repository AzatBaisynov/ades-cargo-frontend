import { useState } from "react";
import { ExcelPreviewTable } from "@/features/import-excel/ui/ExcelPreviewTable";
import { ExcelUpload } from "@/features/import-excel/ui/ExcelUpload";
import { ImportChinaButton } from "@/features/import-excel/ui/importchina-button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/app/store/hooks";
import { ImportSuccessful } from "./ImportSuccessful";

const ExcelPage = () => {
  const previewData = useAppSelector((state) => state.excel.data);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ExcelUpload />
      <ExcelPreviewTable />

      <ImportChinaButton previewData={previewData} onSuccess={() => setIsSuccessOpen(true)} />
      <ImportSuccessful isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default ExcelPage;