import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MainLayout from "@/widgets/layout/ui/MainLayout";
import ExcelPage from "@/pages/ImportExcel/ui/ExcelPage";
import ProductPage from "@/pages/ProductPage/ui/ProductPage";
import { IssuePage } from "@/pages/Issuance/ui/Issuance";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExcelPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/issuance" element={<IssuePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;