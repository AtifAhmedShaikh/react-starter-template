// stores/slices/socketSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createSocketConnection,
  disconnectSocketInstance,
} from "@/lib/socketInstance";

// Keep socket instance outside the store
let socketInstance = null;

export const connectSocket = createAsyncThunk(
  "socket/connect",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      // Create socket (side effect, not stored in state)
      socketInstance = createSocketConnection(token);

      // Optional: wait for connection confirmation
      await new Promise((resolve, reject) => {
        socketInstance.once("connect", resolve);
        socketInstance.once("connect_error", (err) => reject(err));
      });

      return { connected: true };
    } catch (error) {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
      return rejectWithValue(error.message);
    }
  },
);

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    // ❌ socket: null,  ← Remove this!
    connected: false,
    loading: false,
    error: null,
    onlineUsers: {},
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    disconnectSocket: (state) => {
      if (socketInstance) {
        disconnectSocketInstance(); // or socketInstance.disconnect()
        socketInstance = null;
      }
      state.connected = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectSocket.fulfilled, (state) => {
        state.connected = true;
        state.loading = false;
      })
      .addCase(connectSocket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setConnected, setOnlineUsers, disconnectSocket } =
  socketSlice.actions;
export const selectIsConnected = (state) => state.socket.connected;
export const selectSocketInstance = () => socketInstance; // ✅ Getter for socket
export default socketSlice.reducer;
