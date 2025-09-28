import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";

export default function ProtectedRoutesWrapper() {
  const { loading, isValid } = useAuthCheck();
   const location = useLocation();

  if (loading) return null; // or your <Loader />

  return isValid ? <Outlet /> : <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname + location.search)}`} replace />;
}
