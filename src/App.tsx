import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from './app/store/hooks';
import { IssuePage } from './pages/Issuance';
import { ExcelPreviewTable, ExcelUpload, ImportChinaButton } from "./features/import-excel";
const App = () => {

  return (

    <div className="excel-page">
      <IssuePage/> 
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
          previewData={useAppSelector((state) => state.excel.data)}/>
    </div>

  );
}
export default App;