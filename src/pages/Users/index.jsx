import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchUsersAsync } from "@/stores/slices/userSlice";
import UserTable from "@/components/Users/UserTable";
import ViewUserDetailsModal from "@/components/Users/ViewUserDetailsModal";

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <UserTable />
      <ViewUserDetailsModal />
    </div>
  );
};

export default UsersPage;