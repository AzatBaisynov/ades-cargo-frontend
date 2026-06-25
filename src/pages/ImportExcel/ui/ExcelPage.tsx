import { useState } from "react";
import { ExcelPreviewTable } from "@/widgets/excel-import/ui/ExcelPreviewTable";
import { ExcelUpload } from "@/widgets/excel-import/ui/ExcelUpload";
import { ImportChinaButton } from "@/features/import-excel/ui/Importchina-buttons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/app/store/hooks";
import { ImportSuccessful } from "./ImportSuccessful"
import { useAppDispatch } from "@/app/store/hooks";
import { clearExcelData } from "@/features/import-excel/model/excelSlice";


const ExcelPage = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const previewData = useAppSelector((state) => state.excel.data);
  const dispatch = useAppDispatch();
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <div className="space-y-4 relative mb-10">
      <ExcelUpload isUploaded={isUploaded} setIsUploaded={setIsUploaded} />
      <ExcelPreviewTable />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
        <ImportChinaButton
        previewData={previewData}
        onSuccess={() => {
          setSuccessOpen(true);
          dispatch(clearExcelData());
          setIsUploaded(false); 
        }}
      />
      <ImportSuccessful isOpen={successOpen} onSuccess={() => setSuccessOpen(false)} />
    </div>
  );
};

export default ExcelPage;