import { ExcelPreviewTable } from "@/features/import-excel/ui/ExcelPreviewTable";
import { ExcelUpload } from "@/features/import-excel/ui/ExcelUpload";
import { ImportChinaButton } from "@/features/import-excel/ui/importchina-button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/app/store/hooks";

const ExcelPage = () => {
  const previewData = useAppSelector((state) => state.excel.data);

  return (
    <div className="space-y-4">
      <ExcelUpload />
      <ExcelPreviewTable />

      <ImportChinaButton previewData={previewData} />

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