// src/utils/toastUtils.js
import { toast } from "sonner";

/**
 * A centralized and safe wrapper around Sonner toast.
 * Handles string/object messages gracefully and manages loading → success/error flow.
 */
export const showToast = {
  success: (message, options = {}) => {
    toast.success(formatMessage(message), {
      duration: 3000,
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(formatMessage(message), {
      duration: 4000,
      ...options,
    });
  },

  info: (message, options = {}) => {
    toast.info(formatMessage(message), {
      duration: 3000,
      ...options,
    });
  },

  warning: (message, options = {}) => {
    toast(formatMessage(message), {
      duration: 3000,
      style: { background: "#FEF3C7", color: "#92400E" },
      ...options,
    });
  },

  /**
   * Show a loading toast and return its ID (so it can be updated later).
   * @returns {string} toastId
   */
  loading: (message = "Loading...", options = {}) => {
    const id = toast.loading(formatMessage(message), {
      duration: Infinity, // stays until manually updated
      ...options,
    });
    return id;
  },

  /**
   * Update an existing loading toast to success.
   */
  successAfterLoading: (id, message = "Completed!", options = {}) => {
    toast.success(formatMessage(message), { id, ...options });
  },

  /**
   * Update an existing loading toast to error.
   */
  errorAfterLoading: (id, message = "Failed!", options = {}) => {
    toast.error(formatMessage(message), { id, ...options });
  },

  /**
   * Dismiss a specific toast by ID
   */
  dismiss: (toastId) => {
    return toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    return toast.dismiss();
  },

  /**
   * Promise-based toast handling
   */
  promise: (promise, messages, options = {}) => {
    const {
      loading = "Loading...",
      success = "Success!",
      error = "Something went wrong",
      ...rest
    } = messages;

    return toast.promise(promise, {
      loading: formatMessage(loading),
      success: formatMessage(success),
      error: formatMessage(error),
      ...rest,
    });
  },

  /**
   * Custom toast with variant support
   */
  custom: (message, options = {}) => {
    const { variant = "default", ...rest } = options;

    if (variant === "warning") {
      return showToast.warning(message, rest);
    }

    return toast.custom(formatMessage(message), {
      duration: 3000,
      ...rest,
    });
  },
};

/**
 * Ensures safe message formatting for any backend response type.
 * Handles various input types and provides fallback messages.
 */
function formatMessage(message = "") {
  // Handle null/undefined
  if (message === null || message === undefined) {
    return "Something went wrong.";
  }

  // Handle string
  if (typeof message === "string") {
    return message.trim() || "Something went wrong.";
  }

  // Handle objects with message property
  if (typeof message === "object" && message !== null) {
    if (message.message) {
      return String(message.message).trim() || "Something went wrong.";
    }
    if (message.error) {
      return String(message.error).trim() || "Something went wrong.";
    }
    if (message.detail) {
      return String(message.detail).trim() || "Something went wrong.";
    }
    // Try to stringify the object
    try {
      return JSON.stringify(message);
    } catch {
      return "Something went wrong.";
    }
  }

  // Handle numbers, booleans, etc.
  return String(message).trim() || "Something went wrong.";
}

// Export default for convenience
export default showToast;
