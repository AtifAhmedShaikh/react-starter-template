import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";

export const lodgedComplaint = async (data) => {
  try {
    const response = await axiosInstance.post(
      COMPLAINT_APIS.LODGED_COMPLAINT,
      data,
    );
    return {
      success: response?.data?.success || false,
      message: response?.data?.message || "Failed to lodged complaint",
      data: response?.data?.data || null,
      error: null,
    }; //
  } catch (error) {
    return {
      success: error?.response?.data?.success || false,
      message: error?.response?.data?.message || "Failed to lodged complaint",
      error: error,
    }; //
  }
};

export const getComplaintById = async (data) => {
  const response = await axiosInstance.post(
    COMPLAINT_APIS.GET_COMPLAINT_BY_ID,
    data,
  );
  return response.data.data;
};
