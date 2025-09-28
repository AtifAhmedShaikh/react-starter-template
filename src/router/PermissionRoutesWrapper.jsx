import { Navigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";

// permissionKey can be a string or an array of strings
// eslint-disable-next-line no-unused-vars
export default function PermissionRoutesWrapper({ permissionKey, mode = "ALL", Component }) {
    const { hasPermission } = usePermissions();

    if (!hasPermission(permissionKey, mode)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{<Component />}</>;
}
