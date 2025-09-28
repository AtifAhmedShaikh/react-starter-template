import { AppSidebar } from "@/components/sidebar/SidebarApp"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import NotificationDropdown from "../Notifications/NotificationDropdown"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorBoundry } from "../Error/ErrorBoundry"
import { usePermissions } from "@/hooks/usePermissions"
import { PermissionKeys } from "@/constants/permissions"
import { useSelector } from "react-redux"
import { selectCurrentCharge } from "@/stores/slices/authSlice"

export default function SidebarLayout() {
  const { hasPermission } = usePermissions();
  const selectedCharge = useSelector(selectCurrentCharge);
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-2 sm:p-4 p-3 ">
          <div className="flex justify-between sm:items-center items-start sm:flex-row flex-col !sticky top-0 bg-background gap-2 w-full z-10">
            <div className="flex items-center justify-between gap-2 ">
              <SidebarTrigger className={`text-primary`} />
              <div className="text-primary font-bold sm:text-lg text-normal line-clamp-1">
                Enquiries & Anti-Corruption Establishment Sindh
              </div>
            </div>
            <div className="flex text-primary sm:text-sm text-xs justify-end w-full sm:w-auto items-center gap-3 sm:px-5 px-2">
              {hasPermission(PermissionKeys.can_view_notifications) ? <NotificationDropdown /> : ""}
            </div>
          </div>
          <ErrorBoundary FallbackComponent={ErrorBoundry}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </SidebarProvider>
  )
}
