import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  checkAuthAsync,
  selectFetchingStatus,
} from "@/stores/slices/authSlice";
import { verifyJwtToken } from "@/utils/helper";
import { store } from "@/stores";
import { useSelector } from "react-redux";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectFetchingStatus);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const isTokenValid = token && verifyJwtToken(token).success;

    if (!isTokenValid) {
      Cookies.remove("accessToken");
      localStorage.clear();
      return;
    }

    if (status === "loading") return;
    dispatch(checkAuthAsync())
      .unwrap()
      .then(() => {})
      .catch(() => {
        Cookies.remove("accessToken");
        localStorage.clear();
        store.dispatch({ type: "RESET_STORE" });
      });
  }, []);

  return { loading: status === "loading", isValid: status === "idle" };
};
