import { SENSITIVE_FIELDS } from "@/constants";
import axios from "axios";
import JsCookies from "js-cookie";
import { encryptSensitiveFields } from "./encryption";
import { BACKEND_URL, ENABLE_ENCRYPTION } from "@/config/configManager";

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

  const chargeId = JsCookies.get("selectedChargeId");

  if (chargeId) {
    config.headers["charge_id"] = chargeId;
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (!ENABLE_ENCRYPTION) return config; // skip encryption if disabled from env

  // Skip encryption if data is FormData
  const isFormData =
    typeof FormData !== "undefined" && config.data instanceof FormData;
  // Only encrypt for requests with data/body
  if (
    config.data &&
    !isFormData &&
    ["post", "put", "patch"].includes(config.method?.toLowerCase())
  ) {
    config.data = encryptSensitiveFields(config.data, SENSITIVE_FIELDS);
  }
  return config;
});
