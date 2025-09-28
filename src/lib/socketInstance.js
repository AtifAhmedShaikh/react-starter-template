// A singleton to hold the socket instance
import { io } from "socket.io-client";

let socket = null;

export const createSocketConnection = (token) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"],
      path: "/ws/socket.io",
      auth: { token },
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocketInstance = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
