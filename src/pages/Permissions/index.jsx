import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPermissionsAsync } from "@/stores/slices/permissionSlice";
import PermissionTable from "@/components/Permissions/PermissionTable";

const PermissionsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPermissionsAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <PermissionTable />
    </div>
  );
};

export default PermissionsPage;
