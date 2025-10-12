import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { selectActiveTab, selectUser, selectUserRole, setActiveTabItem } from "@/stores/slices/authSlice"
import { LogOut } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { LogoImage, ProfileImage } from "../ui/image-variants"
import { useSidebarMenuLinks } from "./sidebarMenuLinks"

import { usePermissions } from "@/hooks/usePermissions"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"


export function AppSidebar() {
  const user = useSelector(selectUser);

  const { hasPermission } = usePermissions();
  const sidebarMenuLinks = useSidebarMenuLinks()
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const userRole = useSelector(selectUserRole);

  // Filter links based on user permissions
  const filteredLinks = sidebarMenuLinks.filter(link =>
    hasPermission(link.requiredPermissions ?? [], "ANY_ONE")
  );


  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to="/"
          className="flex items-center gap-2 hover:no-underline !p-0"
        >
          <div className="flex justify-center items-center gap-2 px-4">
            <LogoImage
              src="/ace.png"
              alt="Sindh Logo"
              className="rounded-full h-16"
            />
            <h3 className="text-sm ">
              Complaint Center
            </h3>
          </div>
        </Link>
      </SidebarHeader>
      {/* User Profile Info */}
      <div className="flex flex-col items-center justify-center mt-2 px-4">
        <Link to={"/edit-profile"} onClick={() => dispatch(setActiveTabItem(""))}>
          <ProfileImage
            src={user?.profileImage}
            alt="Profile"
            size="lg"
            className="overflow-hidden"
          />
        </Link>


        <h2 className="mt-2 text-primary-two text-center text-normal font-semibold">
          {user?.fullName}
        </h2>
        <h3 className="text-xs text-center capitalize">
          {userRole}
        </h3>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent className="flex-1 mt-4 ">
            <ScrollArea className="h-[calc(100vh-320px)] pr-2">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredLinks.map((item) => {
                      // const isActive = location.pathname === item.url || location.pathname.includes(item.url);
                      const isActive = activeTab === item.name || location.pathname === item.url || location.pathname.startsWith(item.url + "/");
                      return (
                        <SidebarMenuItem size="lg" key={item.url}>
                          <SidebarMenuButton asChild>
                            <Link
                              to={item.url}
                              className={cn(
                                "flex items-center gap-2 px-2 py-1.5 w-full text-lg rounded-md transition-colors",
                                isActive
                                  ? "bg-sidebar-foreground text-primary hover:text-primary"
                                  : "hover:bg-[--sidebar-accent] hover:text-[--sidebar-accent-foreground]"
                              )}
                              onClick={() => {
                                dispatch(setActiveTabItem(item?.name));
                              }}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item?.name}</span>
                              {typeof item?.count === "number" && item?.count > 0 && (
                                <span className="ml-auto bg-primary text-white rounded-full px-2 py-0.5 text-xs font-medium">
                                  {Number(item?.count) || 0}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Sign Out Button */}
              <div className="px-4 mt-6">
                <Button
                  variant="outline"
                  className="w-full justify-center h-10 bg-transparent hover:bg-sidebar-primary hover:text-white border border-muted"
                  onClick={() => navigate("/logout")}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign out
                </Button>
              </div>
            </ScrollArea>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-sm foreground text-center px-4 pb-2">
          Enquiries & Anti-Corruption Establishment Sindh © {new Date().getFullYear()} All Rights Reserved
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
