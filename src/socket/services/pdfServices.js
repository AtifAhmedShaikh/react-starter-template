import { getSocket } from "@/lib/socketInstance";
import { toast } from "sonner";
import { SOCKET_EVENTS } from "../constant";
import {
  generatePdfReportHandler,
  pdfGeneratedHandler,
  pdfGeneratedPrintHandler,
} from "../handlers/pdfHandler";

export const emitSocketEvent = (
  event,
  payload,
  startMessage,
  successEvent,
  errorEvent,
  onSuccess,
) => {
  return new Promise((resolve, reject) => {
    try {
      const socket = getSocket();
      const toastId = toast.info(startMessage, { duration: Infinity });

      socket.emit(event, payload);

      socket.once(successEvent, (response) => {
        toast.dismiss(toastId);

        if (typeof onSuccess === "function") {
          onSuccess(response); // ✅ custom handler
        } else {
          toast.success(response?.message || "Action completed");
        }

        resolve(response);
      });

      socket.once(errorEvent, (errorResponse) => {
        toast.dismiss(toastId);
        toast.error(errorResponse?.message || "Something went wrong");
        reject(errorResponse?.message || "Something went wrong");
      });
    } catch (error) {
      toast.error(error.message || "Socket emit failed");
      reject(error.message || "Socket emit failed");
    }
  });
};

export const downloadComplaintPdfService = (complaintId) =>
  emitSocketEvent(
    SOCKET_EVENTS.LISTENERS.DOWNLOAD_PDF,
    { complaintId },
    "Starting download...",
    SOCKET_EVENTS.EMITTERS.PDF_DOWNLOAD_SUCCESS,
    SOCKET_EVENTS.EMITTERS.PDF_DOWNLOAD_ERROR,
    pdfGeneratedHandler,
  );

export const downloadAndPrintComplaintPdfService = (complaintId) =>
  emitSocketEvent(
    SOCKET_EVENTS.LISTENERS.DOWNLOAD_PRINT_PDF,
    { complaintId },
    "Starting print...",
    SOCKET_EVENTS.EMITTERS.PDF_PRINT_SUCCESS,
    SOCKET_EVENTS.EMITTERS.PDF_PRINT_ERROR,
    pdfGeneratedPrintHandler,
  );

export const downloadReportPdfService = (data) =>
  emitSocketEvent(
    SOCKET_EVENTS.LISTENERS.DOWNLOAD_REPORT_PDF,
    { ...data },
    "Starting report download...",
    SOCKET_EVENTS.EMITTERS.REPORT_PDF_SUCCESS,
    SOCKET_EVENTS.EMITTERS.REPORT_PDF_ERROR,
    generatePdfReportHandler,
  );
