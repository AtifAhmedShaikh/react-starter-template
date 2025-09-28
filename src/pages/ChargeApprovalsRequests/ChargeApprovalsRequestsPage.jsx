"use client";

import FilePreviewOnly from "@/components/reuseable/FilePreviewOnly";
import { LoadingScreen } from "@/components/reuseable/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HTTP_METHODS } from "@/constants";
import { CHARGES_APIS } from "@/constants/APIs";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { apiHandler } from '@/lib/apiWrapper';
import { formatDate } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChargeApprovalsRequestsPage() {
  const [modalData, setModalData] = useState({ type: "", charge: null });
  const queryClient = useQueryClient();
  const { data: charges = [], loading, error } = useFetchQuery({
    key: "chargeApprovalsRequests",
    apiFn: async () => await apiHandler(CHARGES_APIS.GET_APPROVALS_REQUESTS),
  });

  const openModal = (type, charge) => setModalData({ type, charge });

  const closeModal = () => setModalData({ type: "", charge: null });

  const handleApproveCharge = async (chargeId, toUserId) => {
    const response = await apiHandler(CHARGES_APIS.APPROVE_CHARGE, { method: HTTP_METHODS.POST, data: { chargeId, toUserId } })
    if (!response.success) return toast.error(response.message);
    toast.success(response.message);
    closeModal();
    queryClient.invalidateQueries(["chargeApprovalsRequests"]);

  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Approval Requests</h2>

      {loading && <LoadingScreen />}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && charges.length === 0 && <p>No approval requests found.</p>}

      {!loading && !error && charges.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No</TableHead>
              <TableHead>Charge Name</TableHead>
              <TableHead>Assigned Person</TableHead>
              <TableHead>Appointed At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charges.map((item, i) => {
              return (
                <TableRow key={item?.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item?.charge?.chargeName}</TableCell>
                  <TableCell>{item?.toUser?.fullName || "N/A"}</TableCell>
                  <TableCell>
                    {formatDate(item?.appointedAt)}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openModal("view", item)}>
                      <Info size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {/* Modal for View/Approve/Reject */}
      <Dialog open={!!modalData.charge} onOpenChange={closeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {modalData.type} Charge Request
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-700 relative">
            <p><strong>Charge Name:</strong> {modalData.charge?.charge?.chargeName}</p>
            <p>
              <strong>Office Location:</strong>{" "}
              {modalData.charge?.charge?.location?.name ?? "N/A"}
            </p>
            <p>
              <strong>Assigned Person:</strong>{" "}
              {modalData.charge?.toUser?.fullName ?? "Unassigned"}
            </p>
            <p>
              <strong>Appointed At:</strong>{" "}
              {formatDate(modalData.charge?.appointedAt) ?? "N/A"}
            </p>
            <p>
              <strong>Remarks:</strong>{" "}
              {modalData.charge?.remarks ?? "N/A"}
            </p>
            <FilePreviewOnly files={modalData?.charge?.attachments} />
            <div className="flex justify-end gap-2 mt-4">
              <Button className={"my-5 "} onClick={() => handleApproveCharge(modalData?.charge?.charge?.id, modalData?.charge?.toUser?.id)}>Approve</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
