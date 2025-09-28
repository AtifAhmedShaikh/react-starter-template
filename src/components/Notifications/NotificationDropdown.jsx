"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, CheckCircle, Inbox } from "lucide-react";
import dayjs from "dayjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import {
  fetchNotificationsAsync,
  readNotificationAsync,
  deliveredNotificationAsync,
  appendNotifications,
  selectNotifications,
  selectUnreadCount,
  selectNotificationsLoading,
  selectNotificationsPagination,
} from "@/stores/slices/notificationSlice";
import { getSocket } from "@/lib/socketInstance";
import { useNavigate } from "react-router-dom";

export default function NotificationDropdown() {
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const navigate = useNavigate();

  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const loading = useSelector(selectNotificationsLoading);
  const pagination = useSelector(selectNotificationsPagination);

  const socket = getSocket();

  // ✅ Handle socket connection
  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      setSocketConnected(true);
    } else {
      socket.once("connect", () => setSocketConnected(true));
    }

    return () => socket.off("connect");
  }, [socket]);

  // ✅ Fetch notifications and listen for new ones
  useEffect(() => {
    dispatch(fetchNotificationsAsync({ page: 1, limit: 5 }));

    if (socketConnected && socket) {
      socket.on("new-notification", (data) => {
        dispatch(appendNotifications([data]));
      });
    }

    return () => socket?.off("new-notification");
  }, [dispatch, socketConnected, socket]);

  // ✅ Load more when scrolled to bottom
  const loadMore = useCallback(() => {
    if (pagination.current < pagination.totalPages && !loading) {
      dispatch(
        fetchNotificationsAsync({
          page: pagination.current + 1,
          limit: pagination.pageSize,
        })
      );
    }
  }, [dispatch, pagination, loading]);

  // ✅ Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "100px" }
    );

    const lastItem = document.querySelector(
      ".dropdown-notification-item:last-child"
    );
    if (lastItem) observer.observe(lastItem);

    observerRef.current = observer;

    return () => observerRef.current?.disconnect();
  }, [notifications, loadMore]);

  // ✅ Mark as delivered on hover
  const markAsDelivered = (id) => {
    dispatch(deliveredNotificationAsync({ notificationId: id }));
  };

  const markAsRead = (id) => {
    dispatch(readNotificationAsync({ notificationId: id }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center 
                 rounded-full bg-red-500 text-[10px] font-bold text-white leading-none"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="sm:max-w-[400px] max-w-[300px] max-h-[500px] overflow-y-auto"
        side="bottom"
        align="end"
      >
        <DropdownMenuLabel className="sm:text-lg font-semibold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {loading && notifications.length === 0 ? (
          <div className="space-y-2 p-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-md" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
            <Inbox className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <>
            {notifications.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className={cn(
                  "dropdown-notification-item flex flex-col cursor-pointer items-start py-2 px-3 rounded-md ",
                  !item.isRead && "bg-primary/5"
                )}
                onMouseEnter={() =>
                  !item.isDelivered && markAsDelivered(item.id)
                }
                onClick={() => {
                  markAsRead(item.id);
                  const link = item?.metadata?.link;
                  const pathSegments = link.split("/"); 
                  const id = pathSegments[pathSegments.length - 1]; 
                  console.log(id)
                  navigate(`/complaint-details/${id}`)
                }}
              >
                <div className="flex justify-between w-full">
                  <span
                    className={cn(
                      "font-medium sm:text-sm text-xs",
                      !item.isRead && "font-bold"
                    )}
                  >
                    {item.title}
                  </span>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.message}</p>
                <div className="flex items-center justify-between w-full mt-2">
                  <span className="text-[11px] text-gray-400">
                    {dayjs(item.createdAt).format("DD MMM YYYY, HH:mm")}
                  </span>
                  {!item.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(item.id)
                      }}
                      className="flex items-center gap-1 bg-primary hover:bg-primary/80 !text-white sm:text-sm text-xs"
                    >
                      <CheckCircle className=" w-3 h-3 text-white" /> Mark as Read
                    </Button>
                  )}
                </div>
              </DropdownMenuItem>
            ))}

            {/* Loader for infinite scroll */}
            {loading && notifications.length > 0 && (
              <div className="p-2">
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
