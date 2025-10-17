import { showToast } from "@/utils/toastUtils";

export const pdfGeneratedHandler = ({ fileName, mimeType, buffer }) => {
  try {
    const binaryString = atob(buffer);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast.success("Download complete!");
  } catch (error) {
    console.error("PDF Download Error:", error);
    showToast.error("PDF download failed");
  }
};

export const pdfGeneratedPrintHandler = ({ mimeType, buffer }) => {
  try {
    // Decode Base64 string to Uint8Array
    const binaryString = atob(buffer);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create Blob and open in a new tab
    const blob = new Blob([bytes], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl);

    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          showToast.success("Print dialog opened");
        }, 500); // small delay to ensure PDF loads
      };
    } else {
      showToast.error("Popup blocked! Please allow popups and try again.");
    }
  } catch (error) {
    console.error("PDF Print Error:", error);
    showToast.error("PDF printing failed");
  }
};

export const generatePdfReportHandler = ({ fileName, mimeType, buffer }) => {
  try {
    const binaryString = atob(buffer);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast.success("Download complete!");
  } catch (error) {
    console.error("PDF Download Error:", error);
    showToast.error("PDF download failed");
  }
};
