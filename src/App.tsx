import { ExcelPreviewTable } from './features/import-excel/ui/ExcelPreviewTable';
import { ExcelUpload } from './features/import-excel/ui/ExcelUpload';

import { ImportChinaButton } from "./features/import-excel/ui/importchina-button";
const App = () => {

  return (

    <div className="excel-page">
  <ExcelUpload />
  <ExcelPreviewTable />
      <ImportChinaButton 
          previewData={[]}/>
    </div>

  );
}
export default App;