"use client";

import { Bell, CheckCircle, Inbox } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { getSocket } from "@/lib/socketInstance";
import {
  appendNotifications,
  deliveredNotificationAsync,
  fetchNotificationsAsync,
  readNotificationAsync,
  selectNotifications,
  selectNotificationsLoading,
  selectNotificationsPagination,
} from "@/stores/slices/notificationSlice";
import { formatRelativeTime } from "@/utils/formatters";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const navigate = useNavigate()

  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectNotificationsLoading);
  const pagination = useSelector(selectNotificationsPagination);

  const socket = getSocket();

  // ✅ Wait for socket connection
  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      setSocketConnected(true);
    } else {
      socket.once("connect", () => setSocketConnected(true));
    }

    return () => {
      socket.off("connect");
    };
  }, [socket]);

  // ✅ Fetch first page
  useEffect(() => {
    dispatch(fetchNotificationsAsync({ page: 1, limit: 10 }));

    if (socketConnected && socket) {
      // ✅ Listen for new notifications pushed from backend
      socket.on("new-notification", (data) => {
        dispatch(appendNotifications([data]));
      });
    }

    return () => {
      if (socket) socket.off("new-notification");
    };
  }, [dispatch, socket, socketConnected]);

  // ✅ Load next page on scroll
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

  // ✅ Intersection Observer (trigger 3 items before end)
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    const lastNotification = document.querySelector(
      ".notification-item:last-child"
    );
    if (lastNotification) observer.observe(lastNotification);

    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [notifications, loadMore]);

  const markAsRead = (id) => {
    dispatch(readNotificationAsync({ notificationId: id }));
  };

  const markAsDelivered = (id) => {
    dispatch(deliveredNotificationAsync({ notificationId: id }));
  };

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Notifications - Anti-Corruption Establishment Sindh</title>
        <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
      </Helmet>
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Notifications</h2>
      </div>

      {notifications.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
          <Inbox className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-lg font-medium">No notifications</p>
          <p className="text-sm text-gray-400">
            You’re all caught up! New notifications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "notification-item shadow-sm transition hover:shadow-md cursor-pointer hover:ring-2 ring-offset-2 ring-primary",
                !item.isRead && "border-primary bg-primary/10"
              )}
              onMouseEnter={() => !item.isDelivered && markAsDelivered(item.id)}
              onClick={() => {
                markAsRead(item.id);
                const link = item?.metadata?.link;
                const pathSegments = link.split("/"); 
                const id = pathSegments[pathSegments.length - 1]; 
                console.log(id)
                navigate(`/complaint-details/${id}`)
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle
                  className={cn("text-base", !item.isRead && "font-bold")}
                >
                  {item.title}
                </CardTitle>
                <Badge variant="outline">{item.type}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.message}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                  {!item.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(item.id)
                      }}
                      className="flex items-center gap-1 bg-primary text-white"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Loader for infinite scroll */}
          {loading && (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
   </>

  );
}
