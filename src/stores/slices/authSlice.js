// Removed individual API function imports - using apiHandler directly
import { HTTP_METHODS } from "@/constants";
import { AUTH_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  selectedCharge: null,
  isAuthenticated: false,
  temporaryStorage: {},
  status: "idle",
  error: null,
  permissions: [],
  activeTabItem: "",
};

// Async thunks
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const response = await apiHandler(AUTH_APIS.LOGIN, {
      method: HTTP_METHODS.POST,
      data: credentials,
    });
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    const response = await apiHandler(AUTH_APIS.UPDATE_ACCOUNT, {
      method: HTTP_METHODS.POST,
      data: userData,
    });
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updateUserSensitiveFieldsAsync = createAsyncThunk(
  "auth/updateUserSensitiveFields",
  async (userData, { rejectWithValue }) => {
    const response = await apiHandler(
      AUTH_APIS.UPDATE_ACCOUNT_SENSITIVE_FIELDS,
      {
        method: HTTP_METHODS.POST,
        data: userData,
      },
    );
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const response = await apiHandler(AUTH_APIS.CHECK_AUTH, {
      method: HTTP_METHODS.GET,
    });
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (cnic, { rejectWithValue }) => {
    const response = await apiHandler(AUTH_APIS.FORGOT_PASSWORD, {
      method: HTTP_METHODS.POST,
      data: cnic,
    });
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    const response = await apiHandler(AUTH_APIS.RESET_PASSWORD, {
      method: HTTP_METHODS.POST,
      data: resetData,
    });
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const changeProfileImageAsync = createAsyncThunk(
  "auth/changeProfileImage",
  async (data, { rejectWithValue }) => {
    const response = await apiHandler(AUTH_APIS.CHANGE_PROFILE_IMAGE, {
      method: HTTP_METHODS.POST,
      data,
    });
    if (!response?.success) return rejectWithValue(response?.message);
    return response.data;
  },
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await apiHandler(AUTH_APIS.LOGOUT, {
    method: HTTP_METHODS.POST,
  });
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToNull: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setTemporaryValue: (state, action) => {
      console.log("Action payload from temp: ", action.payload);
      state.temporaryStorage[action.payload.key] = action.payload.value;
    },
    setSelectedCharge: (state, action) => {
      console.log("Action payload from temp: ", action.payload);
      state.selectedCharge = action.payload;
    },
    setActiveTabItem: (state, action) => {
      state.activeTabItem = action.payload || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const hasIntent = action.payload?.intent;
        if (hasIntent) return;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload?.data?.user;
        state.permissions = action.payload?.data?.permissions || [];
        state.isAuthenticated = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const updatedUser = {
          fullName: action.payload?.user?.fullName,
          phoneNumber: action.payload?.user?.phoneNumber,
          email: action.payload?.user?.email,
          cityId: action.payload?.user?.cityId,
          address: action.payload?.user?.address,
        };
        console.log("Update user response: ", action.payload?.user);
        state.status = "idle";
        state.user = { ...state.user, ...updatedUser };
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changeProfileImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeProfileImageAsync.fulfilled, (state, action) => {
        const updatedUser = {
          profileImage: action.payload?.data?.profileImage,
        };
        console.log("Update user response: ", action.payload);
        state.status = "idle";
        state.user = { ...state.user, ...updatedUser };
      })
      .addCase(changeProfileImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserSensitiveFieldsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserSensitiveFieldsAsync.fulfilled, (state, action) => {
        const updatedUser = {
          fullName: action.payload?.user?.fullName,
          phoneNumber: action.payload?.user?.phoneNumber,
          email: action.payload?.user?.email,
          cityId: action.payload?.user?.cityId,
          address: action.payload?.user?.address,
        };
        console.log("Update user response: ", action.payload?.user);
        state.status = "idle";
        state.user = { ...state.user, ...updatedUser };
      })
      .addCase(updateUserSensitiveFieldsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAuth = (state) => state.auth || initialState;
export const selectUser = (state) => state.auth?.user || initialState?.user;
export const selectUserRole = (state) => state.auth.user?.role?.value;
export const selectUserPermissions = (state) => state.auth.permissions || [];

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated || false;

export const selectActiveTab = (state) => state.auth?.activeTabItem || "";

// Actions
export const {
  setUserToNull,
  setTemporaryValue,
  setSelectedCharge,
  setActiveTabItem,
} = authSlice.actions;

export default authSlice.reducer;
