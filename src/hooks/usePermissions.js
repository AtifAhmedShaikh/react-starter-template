import { selectUserPermissions } from "@/stores/slices/authSlice";
import { useCallback } from "react";
import { useSelector } from "react-redux";

/**
 * usePermissions - Hook to access user permissions and permission checker function.
 *
 * @returns {{
 *   permissions: Array<{ permission: { key: string } }>,
 *   hasPermission: (requiredPermissions: string | string[], mode?: 'ALL' | 'ANY_ONE') => boolean
 * }}
 */
export const usePermissions = () => {
  // permission modes
  const permissionsMode = {
    ALL: "ALL",
    ANY_ONE: "ANY_ONE",
  };
  const permissions = useSelector(selectUserPermissions);

  const permissionKeys = permissions
    .map((p) => p?.permission?.key)
    .filter(Boolean);

  const hasPermission = useCallback(
    (requiredPermissions, mode = permissionsMode.ALL) => {
      const required = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      if (required.length === 0) return true; // ✅ No restrictions, can access everything
      if (permissionKeys.length === 0) return false; // ❌ No user permissions, can't access anything restricted

      if (mode === permissionsMode.ALL) {
        return required.every((perm) => permissionKeys.includes(perm));
      }

      if (mode === permissionsMode.ANY_ONE) {
        return required.some((perm) => permissionKeys.includes(perm));
      }

      return false;
    },
    [permissionKeys],
  );

  return { permissions, hasPermission };
};
