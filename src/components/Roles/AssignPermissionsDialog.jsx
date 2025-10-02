"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LoadingScreen } from "../reuseable/Loading";
import { apiHandler } from '@/lib/apiWrapper';
import { ROLE_APIS } from "@/constants/APIs";
import { selectPermissions, fetchPermissionsAsync } from "@/stores/slices/permissionSlice";
import { useDispatch, useSelector } from "react-redux";

export const AssignPermissionsDialog = ({ open, onClose, role, onPermissionsUpdated }) => {
    const dispatch = useDispatch();
    const allPermissions = useSelector(selectPermissions);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [roleLoading, setRoleLoading] = useState(false);

    useEffect(() => {
        if (!open || !role) return;

        const fetchData = async () => {
            setRoleLoading(true);
            await dispatch(fetchPermissionsAsync());

            // Fetch full role details including permissions
            const res = await apiHandler(`${ROLE_APIS.GET_ROLE_WITH_PERMISSIONS}/${role?.id}`);
            if (!res?.success) {
                toast.error(res.message || "Failed to fetch role details");
                setRoleLoading(false);
                return;
            }

            setSelectedPermissions(
                res?.data?.permissions?.map((p) => p.permission?.id) || []
            );

            setRoleLoading(false);
        };

        fetchData();
    }, [open, role, dispatch]);

    const togglePermission = (id) => {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedPermissions(allPermissions.map((p) => p.id));
    };

    const handleClearAll = () => {
        setSelectedPermissions([]);
    };

    const handleSave = async () => {
        setLoading(true);
        
        try {
            const response = await apiHandler(`${ROLE_APIS.ASSIGN_PERMISSIONS_TO_ROLE}/${role.id}`, {
                method: "PUT",
                data: {
                    permissionIds: selectedPermissions
                }
            });

            if (!response.success) {
                toast.error(response.message || "Failed to update role permissions");
                return;
            }

            toast.success("Role permissions updated successfully");
            onPermissionsUpdated?.(response.data);
            onClose();
        } catch (error) {
            toast.error(error.message || "Failed to update role permissions");
        } finally {
            setLoading(false);
        }
    };

    const filteredPermissions = allPermissions.filter((p) =>
        p.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (roleLoading) return <LoadingScreen text="Loading role permissions..." />;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Assign Permissions</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Assign permissions to <strong>{role?.value}</strong>
                    </p>
                </DialogHeader>

                {/* Search & Actions */}
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        placeholder="Search permissions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                        Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClearAll}>
                        Clear
                    </Button>
                </div>

                {/* Permissions List */}
                <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-2">
                    {filteredPermissions.length > 0 ? (
                        filteredPermissions.map((perm) => (
                            <label
                                key={perm.id}
                                className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                            >
                                <Checkbox
                                    checked={selectedPermissions.includes(perm.id)}
                                    onCheckedChange={() => togglePermission(perm.id)}
                                />
                                <span className="text-sm">{perm.value}</span>
                            </label>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center">No permissions found.</p>
                    )}
                </div>

                {/* Sticky Footer */}
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button loading={loading} onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
