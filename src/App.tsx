import { ExcelPreviewTable } from './features/import-excel/ui/ExcelPreviewTable';
import { ExcelUpload } from './features/import-excel/ui/ExcelUpload';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
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
</div>
  );
}
export default App;