import { Download, Edit, Plus, Search, Trash, Settings } from "lucide-react";
import { useEffect, useState } from "react";

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

import { ROLE_APIS } from "@/constants/APIs";
import { useImportExport } from "@/hooks/useImportExport";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { MODAL_TYPES, openModal } from "@/stores/slices/modalSlice";
import {
  fetchRolesAsync,
  selectRoles,
  selectRolesLoading,
} from "@/stores/slices/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingScreen } from "../reuseable/Loading";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionKeys } from "@/constants/permissions";
import { formatDate } from "@/utils/formatters";
import { AssignPermissionsDialog } from "./AssignPermissionsDialog";

const RoleTable = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const loading = useSelector(selectRolesLoading);
  const { hasPermission } = usePermissions();
  const { handleExport, handleImport, loading: excelLoading } = useImportExport();
  const { setSearchTerm, filteredData: filteredRoles } = useSearchFilter(
    roles,
    ["key", "value"]
  );
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  const handleImportClick = async () => {
    await handleImport(ROLE_APIS.IMPORT_ROLES, () => {
      dispatch(fetchRolesAsync());
    });
  };

  const handleExportClick = () => {
    handleExport(
      ROLE_APIS.EXPORT_ROLES,
      `roles-${new Date().getTime()}.xlsx`
    );
  };

  const handleAssignPermissions = (role) => {
    setSelectedRole(role);
    setAssignDialogOpen(true);
  };

  const handlePermissionsUpdated = () => {
    dispatch(fetchRolesAsync());
  };

  if (loading.fetch) {
    return <LoadingScreen fullScreen text="Loading Roles..." />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
          <p className="text-gray-600">Manage user roles and their permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleImportClick}
            loading={excelLoading.import}
            loadingLabel="Importing..."
          >
            <Download className="h-4 w-4 mr-2" />
            Import Roles
          </Button>
          <Button
            variant="outline"
            onClick={handleExportClick}
            loading={excelLoading.export}
            loadingLabel="Exporting..."
          >
            <Download className="h-4 w-4 mr-2" />
            Export Roles
          </Button>
          {hasPermission(PermissionKeys.can_create_roles) && (
            <Button
              onClick={() => dispatch(openModal({ modalType: MODAL_TYPES.ADD_ROLE }))}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search roles..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Permissions Count</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No roles found
                </TableCell>
              </TableRow>
            ) : (
              filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.key}</TableCell>
                  <TableCell className="text-gray-600">{role.value}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {role?._count?.permissions|| 0} permissions
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {formatDate(role.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {hasPermission(PermissionKeys.can_edit_roles) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            dispatch(
                              openModal({
                                modalType: MODAL_TYPES.EDIT_ROLE,
                                data: role,
                              })
                            )
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAssignPermissions(role)}
                          title="Assign Permissions"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      
                      {hasPermission(PermissionKeys.can_delete_roles) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            dispatch(
                              openModal({
                                modalType: MODAL_TYPES.DELETE_ROLE,
                                data: role,
                              })
                            )
                          }
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Assign Permissions Dialog */}
      <AssignPermissionsDialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        role={selectedRole}
        onPermissionsUpdated={handlePermissionsUpdated}
      />
    </div>
  );
};

export default RoleTable;
