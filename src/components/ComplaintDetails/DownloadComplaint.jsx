import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { downloadComplaintPdfAsync, selectPdfState } from "@/stores/slices/pdfSlice";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionKeys } from "@/constants/permissions";
import { Download } from "lucide-react";

const DownloadComplaint = ({ complaintId }) => {
  const dispatch = useDispatch();
  const pdfStore = useSelector(selectPdfState);
  const {hasPermission} = usePermissions()
  const canDownloadComplaint = hasPermission(PermissionKeys.can_download_complaint_pdf)

  const handleDownload = () => {
    dispatch(downloadComplaintPdfAsync(complaintId));
  };


  if(!canDownloadComplaint) return null;

  return (
    <Button onClick={handleDownload} loading={pdfStore?.isDownloading} disabled={pdfStore?.isDownloading} className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download PDF
    </Button>
  );
};

export default DownloadComplaint;
