import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MainLayout from "@/widgets/layout/ui/MainLayout";
import ExcelPage from "@/pages/ImportExcel/ui/ExcelPage";
import ProductPage from "@/pages/ProductPage/ui/ProductPage";
import { IssuePage } from "@/pages/Issuance/ui/Issuance";
import AuthPage from "@/pages/AuthPage/ui/AuthPage";
import Protectedroute from "@/app/providers/Protectedroute";
import ProfilePage from "@/pages/ProfilPage/ui/ProfilePage";
import EmployeesPage from "@/pages/EmployeesPage/ui/EmployeesPage";

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
    <Route path="/auth" element={<AuthPage />} />

    <Route element={<Protectedroute />}>
      <Route element={<MainLayout />}>
       <Route path="/" element={<ExcelPage />} />
       <Route path="/products" element={<ProductPage />} />
       <Route path="/issuance" element={<IssuePage />} />
       <Route path="/profile" element={<ProfilePage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      </Route>
    </Route>
  </Routes>
      
    </BrowserRouter>
  );
};

export default App;