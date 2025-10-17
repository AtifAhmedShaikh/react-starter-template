import { prependNotification } from "@/stores/slices/notificationSlice";
import { showToast } from "@/utils/toastUtils";
import { SOCKET_EVENTS } from "../constant";
import { updateProfile } from "@/stores/slices/authSlice";

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

  socket.on(SOCKET_EVENTS.EMITTERS.ADMIN_PROFILE_UPDATE, (updatedInfo) => {
    console.log("📩 New admin profile update received:", updatedInfo);

    // dispatch(prependNotification(notification));
    dispatch(updateProfile(updatedInfo?.user));

    console.log("📩 New admin profile update received:", updatedInfo);
    showToast.success(updatedInfo.title, {
      description: updatedInfo.message,
      duration: 4000,
      action: {
        label: "View",
        onClick: () => {
          window.location.href = updatedInfo.metadata?.link || "/notifications";
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
