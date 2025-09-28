import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthRoutesWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/edit-profile", { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
}
