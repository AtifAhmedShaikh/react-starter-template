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
            <h4 className="font-medium text-foreground">User Label</h4>
            <p className="text-muted-foreground">{statusLabel.userLabel}</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground">Admin Label</h4>
            <p className="text-muted-foreground">{statusLabel.adminLabel}</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground">Original Status</h4>
            <p className="text-muted-foreground">{statusLabel.originalStatus}</p>
          </div>
          {statusLabel.description && (
            <div>
              <h4 className="font-medium text-foreground">Description</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{statusLabel.description}</p>
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
