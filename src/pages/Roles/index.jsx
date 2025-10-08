import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRolesAsync } from "@/stores/slices/roleSlice";
import RoleTable from "@/components/Roles/RoleTable";
import AddRoleModal from "@/components/Roles/AddRoleModal";
import EditRoleModal from "@/components/Roles/EditRoleModal";
import DeleteRoleModal from "@/components/Roles/DeleteRoleModal";

const RolesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <RoleTable />
      <AddRoleModal />
      <EditRoleModal />
      <DeleteRoleModal />
    </div>
  );
};

export default RolesPage;
