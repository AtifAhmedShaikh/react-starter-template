import { downloadReportPdfAsync, selectPdfState } from "@/stores/slices/pdfSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const DownloadReportPdf = ({ data }) => {
  const dispatch = useDispatch();
  const pdfStore = useSelector(selectPdfState);

  const handleDownload = () => {
    const params = typeof data === "function" ? data() : data;
    dispatch(downloadReportPdfAsync(params));
  };

  return (
    <Button
      onClick={handleDownload}
      loading={pdfStore?.isDownloadReportPdf}
      disabled={pdfStore?.isDownloadReportPdf}
    >
      <Download className="mr-2 h-4 w-4" />
      Download PDF
    </Button>
  );
};

export default DownloadReportPdf;
