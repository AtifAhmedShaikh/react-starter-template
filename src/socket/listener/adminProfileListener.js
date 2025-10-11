import { prependNotification } from "@/stores/slices/notificationSlice";
import { toast } from "sonner";
import { SOCKET_EVENTS } from "../constant";

// Load the audio file (ensure the path is correct)
const notificationSound = new Audio("/bell.mp3");

export const setupAdminProfileListenersRedux = async (socket, dispatch) => {
  if (!socket) {
    console.error("Socket is not initialized yet.");
    return;
  }

  console.log(
    "📩 Setting up admin profile listeners...",
    "Socket connected:",
    socket.connected,
  );
  console.log("Socket ", socket);

  socket.on(SOCKET_EVENTS.EMITTERS.ADMIN_PROFILE_UPDATE, (notification) => {
    console.log("📩 New admin profile update received:", notification);

    dispatch(prependNotification(notification));

    console.log("📩 New admin profile update received:", notification);
    toast.success(notification.title, {
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
    playAdminProfileUpdateSound();
  });
};

// Function to play the admin profile update sound
const playAdminProfileUpdateSound = () => {
  notificationSound.currentTime = 0; // Reset the audio to the beginning
  notificationSound.play().catch((err) => {
    console.error("Error playing admin profile update sound:", err);
  });
};
