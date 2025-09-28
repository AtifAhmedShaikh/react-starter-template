import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate, formatRelativeTime } from "@/utils/formatters";
import StatusBadge from "../reuseable/StatusBadge";
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";

const STATUS_BG_COLORS = {
    DISPOSED: "!bg-red-500/30 hover:!text-black",
    FILE_NOT_RELAVENT: "!bg-red-500/40 hover:!text-black ",
    REFER_COMPLAINT: "!bg-red-500/40 hover:!text-black ",
}

const HABITUAL_STATUS_BG_COLORS = {
    SUSPECTED_HABITUAL_COMPLAINANT: "!bg-yellow-500/10 hover:!text-black ",
    HABITUAL_COMPLAINANT: "!bg-yellow-500/40 hover:!text-black ",
}

export default function ComplaintTableRow({ complaint, searchKeyword = "" }) {
    const navigate = useNavigate();
    const isMatchedWithRefNumber = complaint?.refNo === searchKeyword

    // pick color class based on originalStatus
    const statusLabel = complaint?.status?.originalStatus;
    const statusColor = STATUS_BG_COLORS[statusLabel] || "";
    const habitualStatusColor = HABITUAL_STATUS_BG_COLORS[complaint?.user?.complainantTag?.key] || "";
    
    return (
        <TableRow onClick={() => navigate(`/complaint-details/${complaint?.id}`)} className={cn(`[&_td]:sm:!py-3 sm:text-normal hover:bg-primary/80 hover:!text-white ${isMatchedWithRefNumber ? "bg-primary/30" : ""}`, statusColor, habitualStatusColor)}>
            <TableCell>{complaint.refNo}</TableCell>
            <TableCell className={"max-w-xl overflow-hidden"}>{complaint.subject}</TableCell>
            <TableCell>{formatDate(complaint?.createdAt)}</TableCell>
            <TableCell><StatusBadge status={complaint?.status} /></TableCell>
            <TableCell>{formatRelativeTime(complaint?.updatedAt)}</TableCell>
        </TableRow>
    );
}
