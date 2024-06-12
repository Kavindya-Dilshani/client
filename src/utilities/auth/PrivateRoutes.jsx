import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  // If user is logged show the private contents otherwise navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};