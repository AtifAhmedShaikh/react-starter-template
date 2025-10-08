import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAdminsAsync } from "@/stores/slices/adminSlice";
import AdminTable from "@/components/Admins/AdminTable";
import AddAdminModal from "@/components/Admins/AddAdminModal";
import EditAdminModal from "@/components/Admins/EditAdminModal";
import ChangePasswordModal from "@/components/Admins/ChangePasswordModal";
import ChangeRoleModal from "@/components/Admins/ChangeRoleModal";
import ChangeProfileImageModal from "@/components/Admins/ChangeProfileImageModal";
import ViewAdminDetailsModal from "@/components/Admins/ViewAdminDetailsModal";

const AdminsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminsAsync());
  }, []);

  return (
    <div className="container mx-auto p-6">
      <AdminTable />
      <AddAdminModal />
      <EditAdminModal />
      <ChangePasswordModal />
      <ChangeRoleModal />
      <ChangeProfileImageModal />
      <ViewAdminDetailsModal />
    </div>
  );
};

export default AdminsPage;
