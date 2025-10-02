import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { closeModal, MODAL_TYPES, selectIsModalOpenByType, selectModalData } from "@/stores/slices/modalSlice";
import { deleteRoleAsync } from "@/stores/slices/roleSlice";
import { useSelector } from "react-redux";
import ModalWrapper from "../reuseable/ModalWrapper";

const DeleteRoleModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.DELETE_ROLE));
  const role = useSelector(selectModalData);

  const handleDelete = async () => {
    try {
      await dispatch(deleteRoleAsync(role.id)).unwrap();
      toast.success("Role deleted successfully");
      dispatch(closeModal());
    } catch (error) {
      toast.error(error || "Failed to delete role");
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} title="Delete Role">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete role:{" "}
              <strong>{role?.value}</strong>?
              <br />
              <span className="text-sm text-muted-foreground">
                This action cannot be undone and will affect all users assigned to this role.
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteRoleModal;
