import { HTTP_METHODS } from "@/constants";
import { axiosInstance } from "./axiosInstance";

/**
 * Convenient API request wrapper using axios, always returns consistent response structure.
 * @param {Object} config - Axios config: { url, method, params, data, headers, ... }
 * @param {Object} [options] - Optional settings.
 * @param {string} [options.successMessage] - Custom success message.
 * @returns {Promise<Object>} Consistent response object.
 */
export async function apiHandler(
  requestURL,
  {
    method = HTTP_METHODS.GET,
    params = {},
    data = {},
    headers = {},
    ...config
  } = {},
) {
  try {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    // Automatically set 'Content-Type' header if data is FormData and not already set
    if (isFormData && !headers["Content-Type"]) {
      headers["Content-Type"] = "multipart/form-data";
    }
    const response = await axiosInstance({
      url: requestURL,
      method,
      params,
      data,
      headers,
      ...config,
    });
    return {
      success: true,
      message:
        response?.data?.message || response?.message || "Request successful",
      data: response?.data?.data ?? response?.data ?? response,
      meta: response?.data?.meta ?? {},
      statusCode: response?.status ?? response?.data?.statusCode ?? 200,
      stack: undefined,
      error: undefined,
    };
  } catch (error) {
    const isDev = import.meta.env.VITE_APP_ENV === "development";
    // Try to extract meta and data from error response
    const errData = error?.response?.data ?? {};
    return {
      success: false,
      message: errData?.message || error?.message || "An error occurred",
      data: errData?.data ?? null,
      meta: errData?.meta ?? {},
      statusCode: error?.response?.status || errData?.statusCode || 500,
      stack: isDev ? error?.stack || errData?.stack : undefined,
      error: {
        statusCode: error?.response?.status || errData?.statusCode || 500,
        data: errData?.data ?? null,
        success: false,
        meta: errData?.meta ?? {},
      },
    };
  }
}
