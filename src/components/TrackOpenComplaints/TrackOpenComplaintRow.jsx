import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatters";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../reuseable/StatusBadge";
import { User } from "lucide-react";

const TrackOpenComplaintRow = ({ complaint, searchKeyword }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/complaint-details/${complaint.id}`);
  };

  // Highlight search keyword in text
  const highlightText = (text, keyword) => {
    if (!keyword || !text) return text;
    
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <TableRow 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleRowClick}
    >

      {/* Reference Number */}
      <TableCell className="font-medium text-primary">
        {highlightText(complaint?.refNo || "N/A", searchKeyword)}
      </TableCell>

      {/* Subject */}
      <TableCell className="max-w-xs">
        <div className="truncate" title={complaint?.subject}>
          {highlightText(complaint?.subject || "N/A", searchKeyword)}
        </div>
      </TableCell>

      {/* Zone */}
      {/* <TableCell>
        <span className="text-sm text-gray-600">
          {complaint?.zone?.name?.replace(/zone/gi, "").trim() || "N/A"}
        </span>
      </TableCell> */}

      {/* Submission Date */}
      <TableCell className="text-sm text-gray-600">
        {formatDate(complaint?.createdAt)}
      </TableCell>

      {/* Status */}
      <TableCell>
        <StatusBadge status={complaint?.status} />
      </TableCell>

      {/* Last Updated */}
      <TableCell className="text-sm text-gray-600">
        {formatDate(complaint?.updatedAt)}
      </TableCell>
    </TableRow>
  );
};

export default TrackOpenComplaintRow;


//  {/* User Profile Column */}
//  <TableCell className="font-medium">
//  <div className="flex items-center space-x-3">
//    {/* Profile Image */}
//    <div className="flex-shrink-0">
//      {complaint?.user?.profileImage ? (
//        <img
//          className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
//          src={complaint.user.profileImage}
//          alt={complaint?.user?.fullName || "User"}
//          onError={(e) => {
//            e.target.style.display = 'none';
//            e.target.nextSibling.style.display = 'flex';
//          }}
//        />
//      ) : null}
//      <div 
//        className={`h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ${
//          complaint?.user?.profileImage ? 'hidden' : 'flex'
//        }`}
//      >
//        <User className="h-5 w-5 text-gray-500" />
//      </div>
//    </div>
   
//    {/* User Info */}
//    <div className="min-w-0 flex-1">
//      <p className="text-sm font-medium text-gray-900 truncate">
//        {highlightText(complaint?.user?.fullName || "N/A", searchKeyword)}
//      </p>
//      <p className="text-xs text-gray-500 truncate">
//        CNIC: {complaint?.user?.cnic || "N/A"}
//      </p>
//    </div>
//  </div>
// </TableCell>