export const PermissionKeys = {
  // Dashboard permissions
  can_view_dashboard: "can_view_dashboard",

  // User management permissions
  can_view_users: "can_view_users",
  can_edit_profile: "can_edit_profile",
  can_change_password: "can_change_password",
  can_change_profile_image: "can_change_profile_image",

  // Admin management permissions
  can_view_admins: "can_view_admins",
  can_create_admins: "can_create_admins",
  can_edit_admins: "can_edit_admins",
  can_delete_admins: "can_delete_admins",
  can_view_admins_users: "can_view_admins",

  // Role and permission management
  can_create_roles: "can_create_roles",
  can_edit_roles: "can_edit_roles",
  can_delete_roles: "can_delete_roles",

  // Item management (generic for complaints/items)
  can_view_items: "can_view_items",

  // Reports and analytics
  can_generate_reports: "can_generate_reports",
  can_view_statistics: "can_view_statistics",

  // Notifications
  can_view_notifications: "can_view_notifications",

  // Settings and configuration
  can_view_manuals: "can_view_manuals",
  can_view_tutorials: "can_view_tutorials",
};

/**
 * Checks whether the user has the required permission(s).
 *
 * @param {string | string[]} requiredPermissions - Single permission key or array of keys to check.
 * @param {"ALL" | "ANY_ONE"} mode - Match ALL or ANY_ONE (defaults to ALL) * @param {{ permission: { key: string } }[]} userPermissions - User's permissions from Redux.
 * @returns {boolean} - `true` if the user has all required permissions, otherwise `false`.
 */
export const hasPermission = (requiredPermissions, userPermissions = []) => {
  if (!requiredPermissions || userPermissions.length === 0) return false;

  const userPermissionKeys = userPermissions.map((p) => p.permission?.key);

  if (Array.isArray(requiredPermissions)) {
    // Check if user has *every* required permission
    return requiredPermissions.every((perm) =>
      userPermissionKeys.includes(perm),
    );
  }

  // Check single permission
  return userPermissionKeys.includes(requiredPermissions);
};
