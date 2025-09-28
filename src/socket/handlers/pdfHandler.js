import { toast } from "sonner";

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

    toast.success("Download complete!");
  } catch (error) {
    console.error("PDF Download Error:", error);
    toast.error("PDF download failed");
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
          toast.success("Print dialog opened");
        }, 500); // small delay to ensure PDF loads
      };
    } else {
      toast.error("Popup blocked! Please allow popups and try again.");
    }
  } catch (error) {
    console.error("PDF Print Error:", error);
    toast.error("PDF printing failed");
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

    toast.success("Download complete!");
  } catch (error) {
    console.error("PDF Download Error:", error);
    toast.error("PDF download failed");
  }
};
