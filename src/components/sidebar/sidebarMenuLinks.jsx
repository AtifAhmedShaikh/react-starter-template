import { PermissionKeys } from "@/constants/permissions";
import { fetchDashboardData, selectDashboard } from "@/stores/slices/dashboardSlice";
import { selectUnreadCount } from "@/stores/slices/notificationSlice";
import {
  ArrowUp,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  FilePlus,
  FileText,
  Grid2x2,
  Inbox,
  Key,
  Loader,
  Settings,
  Shield,
  ShieldAlert,
  User,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const useSidebarMenuLinks = () => {
  const dispatch=useDispatch()
  const { data } = useSelector(selectDashboard);
  const unreadCount = useSelector(selectUnreadCount);

  useEffect(()=>{
    // dispatch(fetchDashboardData())
  },[])

  return [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Grid2x2,
      requiredPermissions: [PermissionKeys.can_view_dashboard],
    },
    {
      name: "Register Complaint",
      url: "/lodge-complaint",
      icon: FilePlus,
      requiredPermissions: [PermissionKeys.can_lodged_complaints],
    },
    {
      name: "Add Manual Complaint",
      url: "/lodge-open-complaint",
      icon: FilePlus,
      requiredPermissions: [PermissionKeys.can_lodged_open_complaints],
    },
    {
      name: "Track Manual Complaint",
      url: "/track-open-complaints",
      icon: FilePlus,
      count: data?.tabsCount?.totalOpenComplaintsByUser,
      requiredPermissions: [PermissionKeys.can_lodged_open_complaints],
    },
    {
      name: "Track Complaint",
      url: "/track-complaints",
      icon: ClipboardList,
      requiredPermissions: [PermissionKeys.can_track_complaints],
    },
    {
      name: "Charge Approval Requests",
      url: "/charge-approval-requests",
      icon: CheckCircle2,
      requiredPermissions: [PermissionKeys.can_view_charge_approval_requets],
    },
    {
      name: `New Complaints`,
      url: `/new-complaints`,
      icon: Loader,
      count: data?.tabsCount?.newComplaintsCount,
      requiredPermissions: [PermissionKeys.can_view_new_complaints],
    },
    {
      name: `New Complaints`,
      url: `/newly-assigned-complaints`,
      count: data?.tabsCount?.newCount,
      icon: ClipboardList,
      requiredPermissions: [PermissionKeys.can_view_newly_forwarded_complaints],
    },
    {
      name: `Inbox Complaints`,
      url: `/inbox-complaints`,
      icon: Inbox,
      count: data?.tabsCount?.inboxCount,
      requiredPermissions: [PermissionKeys.can_view_inbox_complaints],
    },
    {
      name: `Sent Complaints`,
      url: `/sent-complaints`,
      icon: ArrowUp,
      count: data?.tabsCount?.sentCount,
      requiredPermissions: [PermissionKeys.can_view_sent_complaints],
    },
    {
      name: `Dispose/File`,
      url: `/disposed-with-action-complaints`,
      icon: FileText,
      count: data?.tabsCount?.disposedFileCount,
      requiredPermissions: [
        PermissionKeys.can_view_disposed_with_action_complaints,
        PermissionKeys.can_view_all_disposed_with_action_complaints,
      ],
    },
    {
      name: `Refer Complaints`,
      url: `/refer-complaints`,
      count: data?.tabsCount?.referedComplaint,
      icon: FileText,
      requiredPermissions: [
        PermissionKeys.can_referred_complaints,
      ],
    },
    {
      name: `Dispose/Irrelevant`,
      url: `/disposed-without-action-complaints`,
      icon: XCircle,
      count: data?.tabsCount?.disposedIrrelevantCount,
      requiredPermissions: [
        PermissionKeys.can_view_disposed_without_action_complaints,
        PermissionKeys.can_view_all_disposed_without_action_complaints,
      ],
    },
    {
      name: `Resolved/ With No Action`,
      url: `/resolved-with-no-action-complaints`,
      icon: ShieldAlert,
      count: data?.tabsCount?.resolvedWithNoAction,
      requiredPermissions: [
        PermissionKeys.can_view_resolved_with_no_action_complaints,
        PermissionKeys.can_view_all_resolved_with_no_action_complaints,
      ],
    },
    {
      name: `Resolved/ With Action`,
      url: `/resolved-with-action-complaints`,
      icon: CheckCircle,
      count: data?.tabsCount?.resolvedWithAction,
      requiredPermissions: [
        PermissionKeys.can_view_resolved_with_action_complaints,
        PermissionKeys.can_view_all_resolved_with_action_complaints,
      ],
    },
    {
      name: `Reports`,
      url: `/reports`,
      icon: BarChart3,
      requiredPermissions: [PermissionKeys.can_generate_report],
    },
    {
      name: `All Complaints`,
      url: `/all-complaints`,
      count: data?.totalComplaints ||0,
      icon: ClipboardList,
      requiredPermissions: [PermissionKeys.can_view_all_complaints],
    },
     {
      name: "All Complainants",
      url: "/complainants",
      icon: Users ,
      requiredPermissions: [PermissionKeys.can_view_complainants],
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
      name: "Permissions",
      url: "/permissions",
      icon: Shield,
      requiredPermissions: [],
    },
    {
      name: "Roles",
      url: "/roles",
      icon: Shield,
      requiredPermissions: [],
    },
    {
      name: "Admins",
      url: "/admins",
      icon: Shield,
      requiredPermissions: [],
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings,
      requiredPermissions: [],
    },
  ];
};
