import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import type { RootState } from "@/app/store/store";

const ProtectedRoute = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;