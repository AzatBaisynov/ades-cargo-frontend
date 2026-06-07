import { ExcelPreviewTable } from './features/import-excel/ui/ExcelPreviewTable';
import { ImportExcel } from './pages/ImportExcel/ImportExcel';

function App() {
  return (
    <div className="p-6">
      <ExcelPreviewTable />
      <ImportExcel/>
    </div>
  );
}

export default App;