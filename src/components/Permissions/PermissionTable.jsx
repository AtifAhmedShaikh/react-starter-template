import { Download, Edit, Plus, Search, Trash } from "lucide-react";
import { useEffect } from "react";

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

import { PERMISSION_APIS } from "@/constants/APIs";
import { useImportExport } from "@/hooks/useImportExport";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { MODAL_TYPES, openModal } from "@/stores/slices/modalSlice";
import {
  fetchPermissionsAsync,
  selectPermissions,
  selectPermissionsLoading,
} from "@/stores/slices/permissionSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingScreen } from "../reuseable/Loading";

const PermissionTable = () => {
  const dispatch = useDispatch();
  const permissions = useSelector(selectPermissions);
  const loading = useSelector(selectPermissionsLoading);
  const { handleExport, handleImport, loading: excelLoading } = useImportExport();
  const { setSearchTerm, filteredData: filteredPermissions } = useSearchFilter(
    permissions,
    ["key", "value"]
  );

  useEffect(() => {
    dispatch(fetchPermissionsAsync());
  }, [dispatch]);

  const handleImportClick = async () => {
    await handleImport(PERMISSION_APIS.IMPORT_PERMISSIONS, () => {
      dispatch(fetchPermissionsAsync());
    });
  };

  const handleExportClick = () => {
    handleExport(
      PERMISSION_APIS.EXPORT_PERMISSIONS,
      `permissions-${new Date().getTime()}.xlsx`
    );
  };

  if (loading.fetch) {
    return <LoadingScreen fullScreen text="Loading Permissions..." />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Permissions</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search permissions..."
              className="pl-10 w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={handleImportClick}
            disabled={excelLoading.import}
            loading={excelLoading.import}
            variant="outline"
          >
            <Plus size={16} className="mr-2" />
            Import Excel
          </Button>
          <Button
            onClick={handleExportClick}
            loading={excelLoading.export}
            disabled={excelLoading.import}
            variant="outline"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button onClick={()=>dispatch(openModal({modalType: MODAL_TYPES.ADD_PERMISSION}))}>
            <Plus size={16} className="mr-2" />
            Add Permission
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.map((permission, index) => (
              <TableRow key={permission.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-mono text-sm">{permission.key}</TableCell>
                <TableCell>{permission.value}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-primary hover:text-primary/80"
                      onClick={() => dispatch(openModal({modalType: MODAL_TYPES.EDIT_PERMISSION, data: permission}))}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => dispatch(openModal({modalType: MODAL_TYPES.DELETE_PERMISSION, data: permission}))}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PermissionTable;
