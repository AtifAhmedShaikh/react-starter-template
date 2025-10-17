import { useState } from "react";
import { showToast } from "@/utils/toastUtils";
import { apiHandler } from "@/lib/apiWrapper";
import { HTTP_METHODS } from "@/constants";

export function useImportExport() {
  const [loading, setLoading] = useState({ import: false, export: false });

  const handleExport = async (
    exportUrl,
    defaultFilename = "exported_file.xlsx",
  ) => {
    const toastId = showToast.loading("Exporting...");
    setLoading((prev) => ({ ...prev, export: true }));

    try {
      //! use fetch
      const response = await fetch(exportUrl, {
        method: HTTP_METHODS.GET,
        responseType: "blob",
      });

      let filename = defaultFilename;
      const contentDisposition = response.headers?.["content-disposition"];
      const match = contentDisposition?.match(/filename="?([^"]+)"?/);
      if (match?.[1]) filename = match[1];

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      showToast.successAfterLoading(toastId, "Export completed");
    } catch (error) {
      console.log({ error });
      showToast.errorAfterLoading(toastId, error);
    } finally {
      setLoading((prev) => ({ ...prev, export: false }));
    }
  };

  const handleImport = async (importUrl, onSuccessCallback) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx,.xls";

    fileInput.onchange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const toastId = showToast.loading("Importing...");
      setLoading((prev) => ({ ...prev, import: true }));

      try {
        const response = await apiHandler(importUrl, {
          method: HTTP_METHODS.POST,
          data: formData,
        });

        if (!response.success) {
          throw new Error(response.message || "Import failed");
        }

        showToast.successAfterLoading(toastId, "Import successful");
        if (onSuccessCallback) onSuccessCallback();
      } catch (error) {
        console.error("Import failed:", error);
        showToast.errorAfterLoading(toastId, error?.message || "Import failed");
      } finally {
        setLoading((prev) => ({ ...prev, import: false }));
      }
    };

    fileInput.click();
  };

  return {
    loading,
    handleExport,
    handleImport,
  };
}
