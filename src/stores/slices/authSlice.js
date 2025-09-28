import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  registerUser,
  resendOtp,
  resetPassword,
  updateUser,
  updateUserSensitiveFields,
  verifyAccount,
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

export const verifyAccountAsync = createAsyncThunk(
  "auth/verifyAccount",
  async (otpInfo, { rejectWithValue }) => {
    try {
      return await verifyAccount(otpInfo);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const resendOtpAsync = createAsyncThunk(
  "auth/resendOtp",
  async ({ cnic }, { rejectWithValue }) => {
    try {
      return await resendOtp({ cnic });
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

export const changeProfileImage = createAsyncThunk(
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
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
        state.isAuthenticated = true;
        if (action.payload?.data?.currentCharge) {
          state.selectedCharge = action.payload?.data?.currentCharge;
        }
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
      .addCase(changeProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeProfileImage.fulfilled, (state, action) => {
        const updatedUser = {
          profileImage: action.payload?.data?.profileImage,
        };
        console.log("Update user response: ", action.payload);
        state.status = "idle";
        state.user = { ...state.user, ...updatedUser };
      })
      .addCase(changeProfileImage.rejected, (state, action) => {
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

const emptyPermissions = []; // stable reference

// Selectors
export const selectAuth = (state) => state.auth || initialState;
export const selectUser = (state) => state.auth?.user || initialState?.user;
export const selectUserRole = (state) => state.auth.user?.Role?.roleName || "";
export const selectUserPermissions = (state) =>
  state.auth.user?.permissions || emptyPermissions;
export const selectAssignedCharges = (state) =>
  state.auth.user?.chargesAssigned || []; // holds charges which is assigned to the current user
export const selectUserCNIC = (state) => state.auth.user?.cnic || "";
export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated || false;
export const selectLoadingStatus = (state) => state.auth.status || "idle";
export const selectActiveTab = (state) => state.auth?.activeTabItem || "";
export const selectCurrentCharge = (state) => state.auth?.selectedCharge || {};

// Actions
export const {
  setUserToNull,
  setTemporaryValue,
  setSelectedCharge,
  setActiveTabItem,
} = authSlice.actions;

export default authSlice.reducer;
