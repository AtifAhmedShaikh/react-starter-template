import { BACKEND_URL } from "@/config/configManager";
import axios from "axios";
import { encryptSensitiveFields } from "./encryption";

// Create an instance of axios with custom configuration
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 50000,
  responseType: "json",
});

// Add a request interceptor to include the authorization token
axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Skip encryption if data is FormData
  const isFormData =
    typeof FormData !== "undefined" && config.data instanceof FormData;

  // Only encrypt for requests with data/body
  if (
    config.data &&
    !isFormData &&
    ["post", "put", "patch"].includes(config.method?.toLowerCase())
  ) {
    config.data = encryptSensitiveFields(config.data);
  }

  return config;
});
