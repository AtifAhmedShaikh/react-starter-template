import { getSocket } from "@/lib/socketInstance";
import { SOCKET_EVENTS } from "../constant";

/**
 * ✅ Fetch notifications with pagination
 */
export const fetchNotificationsSocket = ({ page = 1, limit = 10 }) => {
  return new Promise((resolve) => {
    const socket = getSocket();
    socket.emit(SOCKET_EVENTS.LISTENERS.GET_NOTIFICATIONS, { page, limit });

    socket.once(SOCKET_EVENTS.EMITTERS.NOTIFICATIONS_LIST, (response) => {
      resolve(response);
    });
  });
};

/**
 * ✅ Mark notification as delivered
 */
export const markDeliveredSocket = (notificationId, userId) => {
  const socket = getSocket();
  socket.emit(SOCKET_EVENTS.LISTENERS.DELIVERED_NOTIFICATION, {
    notificationId,
    userId,
  });
};

/**
 * ✅ Mark notification as read
 */
export const markReadSocket = (notificationId, userId) => {
  const socket = getSocket();
  socket.emit(SOCKET_EVENTS.LISTENERS.READ_NOTIFICATIONS, {
    notificationId,
    userId,
  });
};
