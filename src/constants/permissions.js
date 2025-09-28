export const PermissionKeys = {
  can_view_dashboard: "can_view_dashboard",
  can_lodged_complaints: "can_lodged_complaints",
  can_track_complaints: "can_track_complaints",
  can_view_admin_label: "can_view_admin_label",
  can_change_password: "can_change_password",
  can_edit_profile: "can_edit_profile",
  can_view_new_complaints: "can_view_new_complaints",
  can_view_charge_approval_requets: "can_view_charge_approval_requets",
  can_view_complaint_details: "can_view_complaint_details",
  can_forward_complaint: "can_forward_complaint",
  can_forward_back_complaint: "can_forward_back_complaint",
  can_forward_to_zone: "can_forward_to_zone",
  can_forward_to_circle: "can_forward_to_circle",
  edit_user_info_on_lodged_complaint: "edit_user_info_on_lodged_complaint",
  can_view_inbox_complaints: "can_view_inbox_complaints",
  can_view_sent_complaints: "can_view_sent_complaints",
  can_view_disposed_with_action_complaints:
    "can_view_disposed_with_action_complaints",
  can_view_disposed_without_action_complaints:
    "can_view_disposed_without_action_complaints",
  can_view_all_disposed_with_action_complaints:
    "can_view_all_disposed_with_action_complaints",
  can_view_all_disposed_without_action_complaints:
    "can_view_all_disposed_without_action_complaints",
  can_generate_report: "can_generate_report",
  can_view_all_complaints: "can_view_all_complaints",
  can_view_resolved_complaints: "can_view_resolved_complaints",
  can_send_follow_up_message: "can_send_follow_up_message",
  can_view_newly_forwarded_complaints: "can_view_newly_forwarded_complaints",
  can_dispose_complaint: "can_dispose_complaint",
  can_irrelevent_complaint: "can_irrelevent_complaint",
  can_resolved_complaint: "can_resolved_complaint",
  can_forward_to_acc_committee: "can_forward_to_acc_committee",
  can_view_notifications: "can_view_notifications",
  can_view_behind_person: "can_view_behind_person",
  can_download_complaint_pdf: "can_download_complaint_pdf",
  can_print_complaint_pdf: "can_print_complaint_pdf",
  can_eligible_for_committee: "can_eligible_for_committee",
  can_resolve_with_action: "can_resolve_with_action",
  can_resolve_without_action: "can_resolve_without_action",
  can_view_resolved_with_action_complaints:
    "can_view_resolved_with_action_complaints",
  can_view_resolved_with_no_action_complaints:
    "can_view_resolved_with_no_action_complaints",
  can_view_all_resolved_with_action_complaints:
    "can_view_all_resolved_with_action_complaints",
  can_view_all_resolved_with_no_action_complaints:
    "can_view_all_resolved_with_no_action_complaints",
  can_view_complainant_profile: "can_view_complainant_profile",
  can_view_manuals: "can_view_manuals",
  can_view_tutorials: "can_view_tutorials",
  can_assign_charge: "can_assign_charge", // user is elible to assign charge
  can_lodged_open_complaints: "can_lodged_open_complaints", // user can lodge open complaints
  can_create_refNo_group: "can_create_refNo_group",
  can_change_profile_image: "can_change_profile_image",
  can_group_complaints: "can_group_complaints",
  can_view_held_charge: "can_view_held_charge",
  can_view_admins_users: "can_view_admins_users",
  can_view_old_refno: "can_view_old_refno",
  can_view_similar_complaints: "can_view_similar_complaints",
  can_referred_complaints: "can_referred_complaints",
  can_view_complainants: "can_view_complainants",
  can_mark_as_habitual_complainant: "can_mark_as_habitual_complainant",
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
