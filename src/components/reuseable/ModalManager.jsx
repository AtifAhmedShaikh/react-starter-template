import { useSelector } from "react-redux";
import { selectActiveModal, MODAL_TYPES } from "@/stores/slices/modalSlice";
import AddPermissionModal from "../Permissions/AddPermissionModal";
import EditPermissionModal from "../Permissions/EditPermissionModal";
import DeletePermissionModal from "../Permissions/DeletePermissionModal";
import EditStatusLabelModal from "../StatusLabels/EditStatusLabelModal";
import ViewStatusLabelDetailsModal from "../StatusLabels/ViewStatusLabelDetailsModal";


const ModalManager = () => {
  const activeModal = useSelector(selectActiveModal);
  switch (activeModal) {
    case MODAL_TYPES.ADD_PERMISSION:
      return <AddPermissionModal />;
    case MODAL_TYPES.EDIT_PERMISSION:
      return <EditPermissionModal />;
    case MODAL_TYPES.DELETE_PERMISSION:
      return <DeletePermissionModal />;
    case MODAL_TYPES.EDIT_STATUS_LABEL:
      return <EditStatusLabelModal />;
    case MODAL_TYPES.VIEW_STATUS_LABEL_DETAILS:
      return <ViewStatusLabelDetailsModal />;
    default:
      return null;
  }
};

export default ModalManager;
