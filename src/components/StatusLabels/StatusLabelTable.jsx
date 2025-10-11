import { Edit, Info } from "lucide-react";
import { useEffect } from "react";

import { LoadingScreen } from "@/components/reuseable/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchStatusLabelsAsync,
  selectStatusLabels,
  selectStatusLabelsLoading,
} from "@/stores/slices/statusLabelSlice";
import { extractColorValues } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/stores/slices/modalSlice";
import { MODAL_TYPES } from "@/stores/slices/modalSlice";

const StatusLabelTable = () => {
  const dispatch = useDispatch();
  const statusLabels = useSelector(selectStatusLabels);
  const loading = useSelector(selectStatusLabelsLoading);

  useEffect(() => {
    dispatch(fetchStatusLabelsAsync());
  }, [dispatch]);

  const handleEdit = (status) => {
    const { bgColor, textColor, borderColor } = extractColorValues(status.colorStyles || "");
    dispatch(openModal({
      modalType: MODAL_TYPES.EDIT_STATUS_LABEL,
      data: {
        ...status,
        bgColor,
        textColor,
        borderColor,
      }
    }));
  };

  const handleViewDetails = (status) => {
    dispatch(openModal({
      modalType: MODAL_TYPES.VIEW_STATUS_LABEL_DETAILS,
      data: status
    }));
  };

  if (loading.fetch) return <LoadingScreen fullScreen text="Loading Status Labels..." />;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Status Labels</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr. No</TableHead>
            <TableHead>User Label</TableHead>
            <TableHead>Admin Label</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statusLabels.map((status, index) => (
            <TableRow key={status?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{status?.userLabel}</TableCell>
              <TableCell>{status?.adminLabel}</TableCell>
              <TableCell>
                <Badge
                  className="rounded-full border text-xs"
                  style={{
                    backgroundColor: extractColorValues(status.colorStyles).bgColor,
                    color: extractColorValues(status.colorStyles).textColor,
                    borderColor: extractColorValues(status.colorStyles).borderColor,
                  }}
                >
                  {status?.adminLabel}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(status)}>
                  <Edit size={16} />
                </Button>
                {status.description && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleViewDetails(status)}
                  >
                    <Info size={16} />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatusLabelTable;