import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { selectModalData, closeModal } from "@/stores/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewStatusLabelDetailsModal = () => {
  const dispatch = useDispatch();
  const statusLabel = useSelector(selectModalData);

  if (!statusLabel) return null;

  return (
    <Dialog open={true} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Status Label Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">User Label</h4>
            <p className="text-gray-600">{statusLabel.userLabel}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Admin Label</h4>
            <p className="text-gray-600">{statusLabel.adminLabel}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Original Status</h4>
            <p className="text-gray-600">{statusLabel.originalStatus}</p>
          </div>
          {statusLabel.description && (
            <div>
              <h4 className="font-medium text-gray-900">Description</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{statusLabel.description}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => dispatch(closeModal())}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStatusLabelDetailsModal;
