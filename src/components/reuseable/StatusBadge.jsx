import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { parseColorStyles } from "@/utils/helper";

/**
 * @param {{ status: { id: string, colorStyles?: string, description?: string, adminLabel?: string, userLabel?: string } }} props
 */
const StatusBadge = ({ status}) => {
  const { hasPermission } = usePermissions();

  const label = hasPermission(PermissionKeys.can_view_admin_label)
    ? status?.adminLabel
    : status?.userLabel;

  const inlineStyle = parseColorStyles(status?.colorStyles || "");

  return (
    <span
      className="px-2 py-1 rounded-full text-xs border-2 font-semibold"
      style={inlineStyle}
      title={status?.description || label}
    >
      {label ||status?.userLabel} 
    </span>
  );
};

export default StatusBadge;
