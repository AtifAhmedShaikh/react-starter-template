import { Download, Search } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { USER_APIS } from "@/constants/APIs";
import { useImportExport } from "@/hooks/useImportExport";
import { usePermissions } from "@/hooks/usePermissions";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { MODAL_TYPES, openModal } from "@/stores/slices/modalSlice";
import {
  fetchUsersAsync,
  selectUsers,
  selectUsersLoading,
  selectUsersQueries,
  updateQuery
} from "@/stores/slices/userSlice";
import { View } from "lucide-react";
import { LoadingScreen } from "../reuseable/Loading";
import { Info } from "lucide-react";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const queries = useSelector(selectUsersQueries);
  const { hasPermission } = usePermissions();
  const { handleExport, handleImport, loading: excelLoading } = useImportExport();
  const { setSearchTerm, filteredData: filteredUsers } = useSearchFilter(
    users,
    ["fullName", "email", "cnic"]
  );

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(updateQuery({ key: "keyword", value }));
  };

  const handleImportClick = async () => {
    await handleImport(USER_APIS.IMPORT_USERS, () => {
      dispatch(fetchUsersAsync());
    });
  };

  const handleExportClick = () => {
    handleExport(
      USER_APIS.EXPORT_USERS,
      `users-${new Date().getTime()}.xlsx`
    );
  };



  if (loading.fetch) {
    return <LoadingScreen fullScreen text="Loading Users..." />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage system users</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleImportClick}
            loading={excelLoading.import}
            loadingLabel="Importing..."
          >
            <Download className="h-4 w-4 mr-2" />
            Import Users
          </Button>
          <Button
            variant="outline"
            onClick={handleExportClick}
            loading={excelLoading.export}
            loadingLabel="Exporting..."
          >
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users by name, email, or CNIC..."
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>CNIC</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>City</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.cnic}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.gender || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role?.value || "N/A"}</Badge>
                  </TableCell>
                  <TableCell>{user.city?.value || "N/A"}</TableCell>
                  <TableCell className="text-right">
                      <Info className="h-4 w-4 hover:text-primary mx-auto" onClick={() => dispatch(openModal({ modalType: MODAL_TYPES.VIEW_USER_DETAILS, data: user }))} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
