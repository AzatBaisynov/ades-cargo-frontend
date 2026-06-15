import { ExcelPreviewTable } from './features/import-excel/ui/ExcelPreviewTable';
import { ExcelUpload } from './features/import-excel/ui/ExcelUpload';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImportChinaButton } from "./features/import-excel/ui/importchina-button";
import {    previewData } from './features/import-excel/ui/mock.data';
const App = () => {

  return (

    <div className="excel-page">
  <ExcelUpload />
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
          previewData={previewData}/>
    </div>

  );
}
export default App;