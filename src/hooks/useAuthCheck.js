// hooks/useAuthCheck.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { checkAuthAsync } from "@/stores/slices/authSlice";
import { verifyJwtToken } from "@/utils/helper";
import { store } from "@/stores";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ loading: true, isValid: false });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const isTokenValid = token && verifyJwtToken(token).success;

    if (!isTokenValid) {
      Cookies.remove("accessToken");
      localStorage.clear();
      setStatus({ loading: false, isValid: false });
      return;
    }

    dispatch(checkAuthAsync())
      .unwrap()
      .then((res) => {
        setStatus({
          loading: false,
          isValid: !!res?.data?.user,
        });
      })
      .catch(() => {
        Cookies.remove("accessToken");
        localStorage.clear();
        store.dispatch({ type: "RESET_STORE" });
        setStatus({ loading: false, isValid: false });
      });
  }, []);

  return status;
};
