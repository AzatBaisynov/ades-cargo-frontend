import { ExcelPreviewTable } from './features/import-excel/ui/ExcelPreviewTable';
import { ExcelUpload } from './features/import-excel/ui/ExcelUpload';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImportChinaButton } from "./features/import-excel/ui/importchina-button";
import {    previewData } from './features/import-excel/ui/mock.data';
import { useAppSelector } from './app/store/hooks';
import { ImportExcel } from './pages/ImportExcel';
const App = () => {

  return (

    <div className="excel-page">
  <ExcelUpload />
  <ExcelPreviewTable />
  <ImportExcel />
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
          previewData={useAppSelector((state) => state.excel.data)}/>
    </div>

  );
}
export default App;