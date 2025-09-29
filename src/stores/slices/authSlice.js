import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  updateUser,
  updateUserSensitiveFields,
} from "@/apis/authApis";
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
    try {
      return await login(credentials);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await updateUser(userData);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);
export const updateUserSensitiveFeildsAsync = createAsyncThunk(
  "auth/updateUserSensitiveFeilds",
  async (userData, { rejectWithValue }) => {
    try {
      return await updateUserSensitiveFields(userData);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      return await checkAuth();
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (cnic, { rejectWithValue }) => {
    try {
      return await forgotPassword(cnic);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      return await resetPassword(resetData);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const changeProfileImageAsync = createAsyncThunk(
  "auth/changeProfileImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiHandler(AUTH_APIS.CHANGE_PROFILE_IMAGE, {
        method: HTTP_METHODS.POST,
        data,
      });
      if (!response?.success) throw new Error(response?.message);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  return await logout();
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
      .addCase(updateUserSensitiveFeildsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserSensitiveFeildsAsync.fulfilled, (state, action) => {
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
      .addCase(updateUserSensitiveFeildsAsync.rejected, (state, action) => {
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
