import { Download, Edit, Eye, Key, Plus, Search, Settings, Trash, User } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ADMIN_APIS } from "@/constants/APIs";
import { PermissionKeys } from "@/constants/permissions";
import { useImportExport } from "@/hooks/useImportExport";
import { usePermissions } from "@/hooks/usePermissions";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import {
  deleteAdminAsync,
  fetchAdminsAsync,
  selectAdmins,
  selectAdminsLoading,
  selectAdminsQueries,
  setSort,
  updateQuery,
} from "@/stores/slices/adminSlice";
import { MODAL_TYPES, openModal } from "@/stores/slices/modalSlice";
import { formatDate } from "@/utils/formatters";
import { LoadingScreen } from "../reuseable/Loading";

const AdminTable = () => {
  const dispatch = useDispatch();
  const admins = useSelector(selectAdmins);
  const loading = useSelector(selectAdminsLoading);
  const queries = useSelector(selectAdminsQueries);
  const { hasPermission } = usePermissions();
  const { handleExport, handleImport, loading: excelLoading } = useImportExport();
  const { setSearchTerm, filteredData: filteredAdmins } = useSearchFilter(
    admins,
    ["fullName", "email", "cnic"]
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(updateQuery({ key: "keyword", value }));
  };

  const handleImportClick = async () => {
    await handleImport(ADMIN_APIS.IMPORT_ADMINS, () => {
      dispatch(fetchAdminsAsync());
    });
  };

  const handleExportClick = () => {
    handleExport(
      ADMIN_APIS.EXPORT_ADMINS,
      `admins-${new Date().getTime()}.xlsx`
    );
  };

  const handleDelete = (adminId) => {
    dispatch(deleteAdminAsync(adminId))
      .unwrap()
      .then(() => {
        // Success handled by the slice
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  const handleSort = (field) => {
    dispatch(setSort(field));
  };

  if (loading.fetch) {
    return <LoadingScreen fullScreen text="Loading Admins..." />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admins Management</h1>
          <p className="text-gray-600">Manage system administrators</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleImportClick}
            loading={excelLoading.import}
            loadingLabel="Importing..."
          >
            <Download className="h-4 w-4 mr-2" />
            Import Admins
          </Button>
          <Button
            variant="outline"
            onClick={handleExportClick}
            loading={excelLoading.export}
            loadingLabel="Exporting..."
          >
            <Download className="h-4 w-4 mr-2" />
            Export Admins
          </Button>
          {hasPermission(PermissionKeys.can_create_admins) && (
            <Button
              onClick={() => dispatch(openModal({ modalType: MODAL_TYPES.ADD_ADMIN }))}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search admins by name, email, or CNIC..."
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
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-1">
                  Created At
                  {queries.sortBy === "createdAt" && (
                    queries.sortOrder === "asc" ? "↑" : "↓"
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No admins found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.fullName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phoneNumber}</TableCell>
                  <TableCell>{admin.cnic}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {admin.gender || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{admin.role?.value || "N/A"}</Badge>
                  </TableCell>
                  <TableCell>{admin.city?.value || "N/A"}</TableCell>
                  <TableCell className="text-gray-500">
                    {formatDate(admin.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        
                        <DropdownMenuItem
                          onClick={() =>
                            dispatch(
                              openModal({
                                modalType: MODAL_TYPES.VIEW_ADMIN_DETAILS,
                                data: admin,
                              })
                            )
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        {hasPermission(PermissionKeys.can_edit_admins) && (
                          <DropdownMenuItem
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modalType: MODAL_TYPES.EDIT_ADMIN,
                                  data: admin,
                                })
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Admin
                          </DropdownMenuItem>
                        )}

                        {hasPermission(PermissionKeys.can_edit_admins) && (
                          <DropdownMenuItem
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modalType: MODAL_TYPES.CHANGE_ADMIN_PASSWORD,
                                  data: admin,
                                })
                              )
                            }
                          >
                            <Key className="mr-2 h-4 w-4" />
                            Change Password
                          </DropdownMenuItem>
                        )}

                        {hasPermission(PermissionKeys.can_edit_admins) && (
                          <DropdownMenuItem
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modalType: MODAL_TYPES.CHANGE_ADMIN_ROLE,
                                  data: admin,
                                })
                              )
                            }
                          >
                            <User className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                        )}

                        {hasPermission(PermissionKeys.can_edit_admins) && (
                          <DropdownMenuItem
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modalType: MODAL_TYPES.CHANGE_ADMIN_PROFILE_IMAGE,
                                  data: admin,
                                })
                              )
                            }
                          >
                            <User className="mr-2 h-4 w-4" />
                            Change Profile Image
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        {hasPermission(PermissionKeys.can_delete_admins) && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Admin
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the admin account and all related data.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive hover:bg-destructive/90"
                                  onClick={() => handleDelete(admin.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminTable;
