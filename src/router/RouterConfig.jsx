import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { PermissionKeys } from "@/constants/permissions";
import {
  AboutPage,
  AllComplaintsPage,
  ChangePasswordPage,
  ChargeApprovalRequetsPage,
  ComplainerComplaintsPage,
  ComplaintDetailsPage,
  ContactUsPage,
  Dashboard,
  DisposeWithActionComplaintsPage,
  DisposeWithoutActionComplaintsPage,
  EditProfilePage,
  ForgotPasswordPage,
  HomePage,
  InboxComplaintsPage,
  LodgeComplaintPage,
  LodgeOpenComplaintPage,
  LoginPage,
  LogoutPage,
  ManualPage,
  NewComplaintsPage,
  NewlyForwardedPage,
  NotFound,
  NotificationsPage,
  ReportsGenerationPage,
  ResolvedComplaintsPage,
  ResolvedWithoutComplaintsPage,
  SentComplaintsPage,
  SettingsPage,
  SignUpPage,
  TrackComplaintsPage,
  TutorialPage,
  TutorialsPage,
  UnauthorizedAccessPage,
  AdminUsersPage,
  AdminProfileDetailsPage,
  ComplainantsPage,
  MobileAppReleasePage,
  ReferComplaintsPage
} from "@/pages";

import SocketLayout from "@/components/SocketLayout";
import AuthRoutesWrapper from "./AuthRoutesWrapper";
import PermissionRoutesWrapper from "./PermissionRoutesWrapper";
import ProtectedRoutesWrapper from "./ProtectedRoutesWrapper";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy/PrivacyPolicyPage";
import TermAndCondition from "@/components/layouts/TermsAndConditions/TermsAndCondition";
import ServicesPage from "@/pages/ServicesPage/ServicesPage";
import StatisticsPage from "@/pages/StatisticsPage/StatisticsPage";
import TrackOpenComplaintsPage from "@/pages/TrackOpenComplaints/TrackOpenComplaintsPage";

export const routesConfig = [
  // Public Routes
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/mobile-app-release",
    element: <MobileAppReleasePage />,
  },
  {
    path: "/terms-and-condition",
    element: <TermAndCondition />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
  {
    path: "/contact",
    element: <ContactUsPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },

  // Auth Routes
  {
    wrapper: AuthRoutesWrapper,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <SignUpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },

    ],
  },

  // Protected Routes
  {
    wrapper: ProtectedRoutesWrapper,
    children: [
      {
        wrapper: SidebarLayout,
        children: [
          {
            wrapper: SocketLayout,
            children: [
              { path: "/dashboard", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_dashboard} Component={Dashboard} /> },
              { path: "/lodge-complaint", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_lodged_complaints} Component={LodgeComplaintPage} /> },
              { path: "/lodge-open-complaint", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_lodged_open_complaints} Component={LodgeOpenComplaintPage} /> },
              { path: "/track-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_track_complaints} Component={TrackComplaintsPage} /> },
              { path: "/track-open-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_lodged_open_complaints} Component={TrackOpenComplaintsPage} /> },
              { path: "/complaint-details/:id", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_complaint_details} Component={ComplaintDetailsPage} /> },
              { path: "/charge-approval-requests", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_charge_approval_requets} Component={ChargeApprovalRequetsPage} /> },
              { path: "/settings", element: <SettingsPage /> },
              { path: "/reports", element: <ReportsGenerationPage /> },
              { path: "/edit-profile", element: <EditProfilePage /> },
              {
                path: "/change-password",
                element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_change_password} Component={ChangePasswordPage} />
              },
              {
                path: "/new-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_new_complaints} Component={NewComplaintsPage} />
              },
              {
                path: "/inbox-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_inbox_complaints} Component={InboxComplaintsPage} />
              },
              {
                path: "/sent-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_sent_complaints} Component={SentComplaintsPage} />
              },
              {
                path: "/resolved-with-action-complaints", element: <PermissionRoutesWrapper permissionKey={[PermissionKeys.can_view_resolved_with_action_complaints, PermissionKeys.can_view_all_resolved_with_action_complaints]} mode={"ANY_ONE"} Component={ResolvedComplaintsPage} />
              },
              {
                path: "/resolved-with-no-action-complaints", element: <PermissionRoutesWrapper permissionKey={[PermissionKeys.can_view_resolved_with_no_action_complaints, PermissionKeys.can_view_all_resolved_with_no_action_complaints]} mode={"ANY_ONE"} Component={ResolvedWithoutComplaintsPage} />
              },
              {
                path: "/disposed-with-action-complaints", element: <PermissionRoutesWrapper permissionKey={[PermissionKeys.can_view_disposed_with_action_complaints, PermissionKeys.can_view_all_disposed_with_action_complaints]} mode={"ANY_ONE"} Component={DisposeWithActionComplaintsPage} />
              },
              {
                path: "/disposed-without-action-complaints", element: <PermissionRoutesWrapper permissionKey={[PermissionKeys.can_view_disposed_without_action_complaints, PermissionKeys.can_view_all_disposed_without_action_complaints]} mode={"ANY_ONE"} Component={DisposeWithoutActionComplaintsPage} />
              },
              {
                path: "/refer-complaints", element: <PermissionRoutesWrapper permissionKey={[PermissionKeys.can_referred_complaints]} Component={ReferComplaintsPage} />
              },
              {
                path: "/all-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_all_complaints} Component={AllComplaintsPage} />
              },
              {
                path: "/newly-assigned-complaints", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_newly_forwarded_complaints} Component={NewlyForwardedPage} />
              },
              {
                path: "/notifications", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_notifications} Component={NotificationsPage} />
              },
              {
                path: "/complainant-profile/:id", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_complainant_profile} Component={ComplainerComplaintsPage} />
              },
              {
                path: "/admin-profile/:id", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_admins_users} Component={AdminProfileDetailsPage} />
              },
              {
                path: "/tutorials", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_tutorials} Component={TutorialsPage} />
              },
              {
                path: "/tutorial/:id", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_tutorials} Component={TutorialPage} />
              },
              {
                path: "/manuals", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_manuals} Component={ManualPage} />
              },
              {
                path: "/admins", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_admins_users} Component={AdminUsersPage} />
              },
              {
                path: "/complainants", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_complainants} Component={ComplainantsPage} />
              },
            ]
          }
        ],
      },
    ],
  },
  // Unauthorized & Fallback
  { path: "/unauthorized", element: <UnauthorizedAccessPage /> },
  { path: "*", element: <NotFound /> },
];
