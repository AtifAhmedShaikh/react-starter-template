import { AUTH_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance"; // You can replace this with axios.create(...) if needed

export const login = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.LOGIN, data);
  return response.data.data;
};

export const updateUser = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.UPDATE_ACCOUNT, data);
  return response.data.data;
};

export const updateUserSensitiveFields = async (data) => {
  const response = await axiosInstance.post(
    AUTH_APIS.UPDATE_ACCOUNT_SENSITIVE_FIELDS,
    data,
  );
  return response.data.data;
};

export const verifyAccount = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.VERIFY_ACCOUNT, data);
  return response.data.data;
};

export const logout = async () => {
  const response = await axiosInstance.post(AUTH_APIS.LOGOUT);
  return response.data.data;
};

export const checkAuth = async () => {
  const response = await axiosInstance.get(AUTH_APIS.CHECK_AUTH);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.REGISTER_USER, data);
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.RESEND_OTP, data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.FORGOT_PASSWORD, data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post(AUTH_APIS.RESET_PASSWORD, data);
  return response.data;
};

export const changePassword = async (data) => {
  try {
    const response = await axiosInstance.post(AUTH_APIS.CHANGE_PASSWORD, data);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
