import { useSelector } from "react-redux";
import { selectActiveModal, MODAL_TYPES } from "@/stores/slices/modalSlice";
import AddPermissionModal from "../Permissions/AddPermissionModal";
import EditPermissionModal from "../Permissions/EditPermissionModal";
import DeletePermissionModal from "../Permissions/DeletePermissionModal";


const ModalManager = () => {
  const activeModal = useSelector(selectActiveModal);
  switch (activeModal) {
    case MODAL_TYPES.ADD_PERMISSION:
      return <AddPermissionModal />;
    case MODAL_TYPES.EDIT_PERMISSION:
      return <EditPermissionModal />;
    case MODAL_TYPES.DELETE_PERMISSION:
      return <DeletePermissionModal />;
    default:
      return null;
  }
};

export default ModalManager;
