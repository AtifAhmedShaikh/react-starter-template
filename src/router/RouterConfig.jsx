import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { PermissionKeys } from "@/constants/permissions";
import {
  AboutPage,
  AdminProfilePage,
  AdminsPage,
  ChangePasswordPage,
  ContactUsPage,
  Dashboard,
  EditProfilePage,
  ForgotPasswordPage,
  HomePage,
  ItemsPage,
  LoginPage,
  LogoutPage,
  ManualPage,
  MobileAppPage,
  NotFound,
  NotificationsPage,
  PermissionsPage,
  PrivacyPolicyPage,
  ReportsPage,
  RolesPage,
  ServicesPage,
  SettingsPage,
  SignUpPage,
  StatisticsPage,
  TermsAndConditionPage,
  TutorialPage,
  TutorialsPage,
  UnauthorizedAccessPage,
  UsersPage
} from "@/pages";


import SocketLayout from "@/components/SocketLayout";
import AuthRoutesWrapper from "./AuthRoutesWrapper";
import PermissionRoutesWrapper from "./PermissionRoutesWrapper";
import ProtectedRoutesWrapper from "./ProtectedRoutesWrapper";

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
    element: <MobileAppPage />,
  },
  {
    path: "/terms-and-condition",
    element: <TermsAndConditionPage />,
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
              { path: "/items", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_items} Component={ItemsPage} /> },
              { path: "/users", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_users} Component={UsersPage} /> },

              { path: "/admin-profile/:id", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_admins_users} Component={AdminProfilePage} /> },
              { path: "/admins", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_admins} Component={AdminsPage} /> },
              { path: "/settings", element: <SettingsPage /> },
              { path: "/reports", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_generate_reports} Component={ReportsPage} /> },
              { path: "/statistics", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_statistics} Component={StatisticsPage} /> },
              { path: "/edit-profile", element: <EditProfilePage /> },
              {
                path: "/change-password",
                element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_change_password} Component={ChangePasswordPage} />
              },
              {
                path: "/notifications", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_notifications} Component={NotificationsPage} />
              },
              {
                path: "/tutorials", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_tutorials} Component={TutorialsPage} />
              },
              {
                path: "/tutorial/:id", element: <PermissionRoutesWrapper permissionKey={PermissionKeys.can_view_tutorials} Component={TutorialPage} />
              },
              {
                path: "/manuals", element: <PermissionRoutesWrapper permissionKey={[PermissionKeys.can_edit_profile]} Component={ManualPage} />
              },
              {
                path: "/permissions", element: <PermissionRoutesWrapper permissionKey={[]} Component={PermissionsPage} />
              },
              {
                path: "/roles", element: <PermissionRoutesWrapper permissionKey={[]} Component={RolesPage} />
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
