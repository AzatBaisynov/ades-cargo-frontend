import { ExcelPreviewTable } from './features/import-excel/ui/ExcelPreviewTable';
import { ExcelUpload } from './features/import-excel/ui/ExcelUpload';


function App() {
  return (
    <div className="excel-page">
  <ExcelUpload />
  <ExcelPreviewTable />
</div>
  );
}
export default App;