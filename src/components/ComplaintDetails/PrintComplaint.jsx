import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { downloadAndPrintComplaintPdfAsync, selectPdfState } from "@/stores/slices/pdfSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";

const PrintComplaint = ({ complaintId }) => {
  const dispatch = useDispatch();
  const pdfStore = useSelector(selectPdfState);
  const {hasPermission} = usePermissions()
    const canPrintComplaintPdf = hasPermission(PermissionKeys.can_print_complaint_pdf) 
  

  const handleDownload = () => {
    dispatch(downloadAndPrintComplaintPdfAsync(complaintId));
  };

  if(!canPrintComplaintPdf) return null;
  
  return (
    <Button onClick={handleDownload} loading={pdfStore?.isPrinting} disabled={pdfStore?.isPrinting} className="flex items-center gap-2">
      <Printer className="w-4 h-4" />
      Print PDF
    </Button>
  );
};

export default PrintComplaint;
