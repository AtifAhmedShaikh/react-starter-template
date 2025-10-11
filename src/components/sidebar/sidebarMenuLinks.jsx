import { PermissionKeys } from "@/constants/permissions";
import { selectUnreadCount } from "@/stores/slices/notificationSlice";
import {
  BarChart3,
  Bell,
  BookOpen, Briefcase, Grid2x2,
  Key,
  Settings,
  Shield,
  Tag,
  TrendingUp,
  User,
  Users,
  Video
} from "lucide-react";
import { useSelector } from "react-redux";

export const useSidebarMenuLinks = () => {

  const unreadCount = useSelector(selectUnreadCount);


  return [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Grid2x2,
      requiredPermissions: [PermissionKeys.can_view_dashboard],
    },
    {
      name: "Reports",
      url: "/reports",
      icon: BarChart3,
      requiredPermissions: [PermissionKeys.can_generate_reports],
    },
    {
      name: "Statistics",
      url: "/statistics",
      icon: TrendingUp,
      requiredPermissions: [PermissionKeys.can_view_statistics],
    },
    {
      name: "Users",
      url: "/users",
      icon: Users,
      requiredPermissions: [PermissionKeys.can_view_users],
    },
    {
      name: "Admins",
      url: "/admins",
      icon: Shield,
      requiredPermissions: [PermissionKeys.can_view_admins],
    },
    {
      name: "Roles",
      url: "/roles",
      icon: Briefcase,
      requiredPermissions: [],
    },
    {
      name: "Permissions",
      url: "/permissions",
      icon: Shield,
      requiredPermissions: [],
    },
    {
      name: "Status Labels",
      url: "/status-labels",
      icon: Tag,
      requiredPermissions: [],
    },
    {
      name: "Notifications",
      url: "/notifications",
      count: unreadCount || 0,
      icon: Bell,
      requiredPermissions: [PermissionKeys.can_view_notifications],
    },
    {
      name: "Tutorials",
      url: "/tutorials",
      icon: Video,
      requiredPermissions: [PermissionKeys.can_view_tutorials],
    },
    {
      name: "Manuals",
      url: "/manuals",
      icon: BookOpen,
      requiredPermissions: [PermissionKeys.can_view_manuals],
    },
    {
      name: "Profile",
      url: "/edit-profile",
      icon: User,
      requiredPermissions: [],
    },
    {
      name: "Change Password",
      url: "/change-password",
      icon: Key,
      requiredPermissions: [PermissionKeys.can_change_password],
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings,
      requiredPermissions: [],
    },
  ];
};
