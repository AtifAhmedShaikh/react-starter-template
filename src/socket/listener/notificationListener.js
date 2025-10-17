import {
  prependNotification,
  markNotificationAsRead,
  markNotificationAsDelivered,
} from "@/stores/slices/notificationSlice";
import { showToast } from "@/utils/toastUtils";
import { SOCKET_EVENTS } from "../constant";

// Load the audio file (ensure the path is correct)
const notificationSound = new Audio("/bell.mp3");

export const setupNotificationListenersRedux = async (socket, dispatch) => {
  if (!socket) {
    console.error("Socket is not initialized yet.");
    return;
  }

  console.log(
    "📩 Setting up notification listeners...",
    "Socket connected:",
    socket.connected,
  );
  console.log("Socket ", socket);

  socket.on(SOCKET_EVENTS.EMITTERS.NEW_NOTIFICATION, (notification) => {
    console.log("📩 New notification received:", notification);

    dispatch(prependNotification(notification));

    console.log("📩 New notification received:", notification);
    showToast.success(notification.title, {
      description: notification.message,
      duration: 4000,
      action: {
        label: "View",
        onClick: () => {
          window.location.href =
            notification.metadata?.link || "/notifications";
        },
      },
    });
    playNotificationSound();
  });

  socket.on(SOCKET_EVENTS.EMITTERS.NOTIFICATION_ERROR, (error) => {
    console.error("Notification Error:", error);
    showToast.error("Failed to receive notification");
  });

  // Listen for notification read confirmation
  socket.on(SOCKET_EVENTS.EMITTERS.NOTIFICATION_READ, (response) => {
    console.log("📖 Notification marked as read:", response);
    if (response.success && response.notificationId) {
      dispatch(
        markNotificationAsRead({ notificationId: response.notificationId }),
      );
    }
  });

  // Listen for notification delivered confirmation
  socket.on(SOCKET_EVENTS.EMITTERS.NOTIFICATION_DELIVERED, (response) => {
    console.log("📬 Notification marked as delivered:", response);
    if (response.success && response.notificationId) {
      dispatch(
        markNotificationAsDelivered({
          notificationId: response.notificationId,
        }),
      );
    }
  });
};

// Function to play the notification sound
const playNotificationSound = () => {
  notificationSound.currentTime = 0; // Reset the audio to the beginning
  notificationSound.play().catch((err) => {
    console.error("Error playing notification sound:", err);
  });
};
