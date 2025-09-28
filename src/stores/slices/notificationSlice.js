import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchNotificationsSocket,
  markDeliveredSocket,
  markReadSocket,
} from "@/socket/services/notificationServices";

// ✅ Fetch All Notifications (Socket)
export const fetchNotificationsAsync = createAsyncThunk(
  "notifications/fetchAll",
  async ({ userId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await fetchNotificationsSocket({ userId, page, limit });

      if (res.success) {
        return {
          notifications: res?.notifications || [], // ✅ keep it as array
          pagination: res?.pagination || {},
          unReadNotifications: res?.unReadNotifications || 0,
        };
      }

      return rejectWithValue(res.message || "Failed to fetch notifications");
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching notifications");
    }
  },
);

// ✅ Mark Delivered (Socket)
export const deliveredNotificationAsync = createAsyncThunk(
  "notifications/delivered",
  async ({ notificationId, userId }, { rejectWithValue }) => {
    const res = await markDeliveredSocket(notificationId, userId);
    return true;
  },
);

// ✅ Mark Read (Socket)
export const readNotificationAsync = createAsyncThunk(
  "notifications/read",
  async ({ notificationId, userId }, { rejectWithValue }) => {
    const res = await markReadSocket(notificationId, userId);
    return true;
  },
);

const initialState = {
  notifications: [],
  pagination: { current: 1, pageSize: 10, total: 0, totalPages: 0 },
  loading: { fetch: false, delivered: false, read: false },
  error: { fetch: null, delivered: null, read: null },
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    appendNotifications: (state, action) => {
      // ✅ Used for infinite scroll
      state.notifications = [...state.notifications, ...action.payload];
    },
    prependNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
      state.unreadCount += 1;
    },
    markNotificationAsRead: (state, action) => {
      const { notificationId } = action.payload;
      state.notifications = state.notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n,
      );
      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
    markNotificationAsDelivered: (state, action) => {
      const { notificationId } = action.payload;
      state.notifications = state.notifications.map((n) =>
        n.id === notificationId ? { ...n, isDelivered: true } : n,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Notifications
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;

        const {
          notifications = [],
          unReadNotifications = 0,
          pagination = {},
        } = action.payload;

        // ✅ If page = 1 → reset; otherwise append
        state.notifications =
          pagination.page === 1
            ? notifications
            : [...state.notifications, ...notifications];

        state.pagination = {
          current: pagination.page || 1,
          pageSize: pagination.limit || 10,
          total: pagination.total || 0,
          totalPages: pagination.totalPages || 1,
        };

        // ✅ Recalculate unread count
        state.unreadCount = unReadNotifications;
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload || "Failed to fetch notifications";
      })

      // 🔹 Delivered Notification
      .addCase(deliveredNotificationAsync.pending, (state) => {
        state.loading.delivered = true;
        state.error.delivered = null;
      })
      .addCase(deliveredNotificationAsync.fulfilled, (state, action) => {
        state.loading.delivered = false;
        // state.notifications = state.notifications.map((n) =>
        //   n.id === action.payload.id
        //     ? { ...n, isDelivered: action.payload.isDelivered }
        //     : n,
        // );
      })
      .addCase(deliveredNotificationAsync.rejected, (state, action) => {
        state.loading.delivered = false;
        state.error.delivered = action.payload || "Failed to mark delivered";
      })

      // 🔹 Read Notification
      .addCase(readNotificationAsync.pending, (state) => {
        state.loading.read = true;
        state.error.read = null;
      })
      .addCase(readNotificationAsync.fulfilled, (state, action) => {
        state.loading.read = false;
        // state.notifications = state.notifications.map((n) =>
        //   n.id === action.payload.id
        //     ? { ...n, isRead: action.payload.isRead }
        //     : n,
        // );
        // state.unreadCount = state.unreadCount - 1;
      })
      .addCase(readNotificationAsync.rejected, (state, action) => {
        state.loading.read = false;
        state.error.read = action.payload || "Failed to mark read";
      });
  },
});

export const {
  appendNotifications,
  prependNotification,
  markNotificationAsRead,
  markNotificationAsDelivered,
} = notificationsSlice.actions;
export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationsLoading = (state) =>
  state.notifications.loading.fetch;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationsPagination = (state) =>
  state.notifications.pagination;

export default notificationsSlice.reducer;
