export const SOCKET_EVENTS = {
  LISTENERS: {
    DELIVERED_NOTIFICATION: "delivered-notification",
    READ_NOTIFICATIONS: "read-notifications",
    GET_NOTIFICATIONS: "get-notifications",

    DOWNLOAD_PDF: "download-pdf",
    DOWNLOAD_PRINT_PDF: "download-print-pdf",
    DOWNLOAD_REPORT_PDF: "download-report-pdf",
  },
  EMITTERS: {
    NOTIFICATIONS_LIST: "notifications-list",
    NOTIFICATION_READ: "notification-read",
    NOTIFICATION_DELIVERED: "notification-delivered",

    NEW_NOTIFICATION: "new-notification",
    NOTIFICATION_ERROR: "notification-error",

    PDF_DOWNLOAD_SUCCESS: "pdf-download-success",
    PDF_DOWNLOAD_ERROR: "pdf-download-error",

    PDF_PRINT_SUCCESS: "pdf-print-success",
    PDF_PRINT_ERROR: "pdf-print-error",

    REPORT_PDF_SUCCESS: "report-pdf-success",
    REPORT_PDF_ERROR: "report-pdf-error",
  },
};
