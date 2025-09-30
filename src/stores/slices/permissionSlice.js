import { HTTP_METHODS } from "@/constants";
import { PERMISSION_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [],
  status: "idle",
  error: null,
  lastFetched: null,
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
  },
};

// Async thunks
export const fetchPermissionsAsync = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { lastFetched, permissions } = state.permissions;

      // Check if we have recent data (within 5 minutes)
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (
        lastFetched &&
        now - lastFetched < fiveMinutes &&
        permissions.length > 0
      ) {
        return permissions; // Return cached data
      }

      const response = await apiHandler(PERMISSION_APIS.GET_ALL_PERMISSIONS, {
        method: HTTP_METHODS.GET,
      });
      if (!response.success) throw new Error(response.message);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const createPermissionAsync = createAsyncThunk(
  "permissions/createPermission",
  async (permissionData, { rejectWithValue }) => {
    try {
      const response = await apiHandler(PERMISSION_APIS.CREATE_PERMISSION, {
        method: HTTP_METHODS.POST,
        data: permissionData,
      });
      if (!response.success) throw new Error(response.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const updatePermissionAsync = createAsyncThunk(
  "permissions/updatePermission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiHandler(
        `${PERMISSION_APIS.UPDATE_PERMISSION}/${id}`,
        {
          method: HTTP_METHODS.PUT,
          data,
        },
      );
      if (!response.success) throw new Error(response.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const deletePermissionAsync = createAsyncThunk(
  "permissions/deletePermission",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiHandler(
        `${PERMISSION_APIS.DELETE_PERMISSION}/${id}`,
        {
          method: HTTP_METHODS.DELETE,
        },
      );
      if (!response.success) throw new Error(response.message);
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

// Slice
const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch permissions
      .addCase(fetchPermissionsAsync.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
      })
      .addCase(fetchPermissionsAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";
        state.permissions = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchPermissionsAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })
      // Create permission
      .addCase(createPermissionAsync.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createPermissionAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.permissions.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPermissionAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })
      // Update permission
      .addCase(updatePermissionAsync.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePermissionAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.permissions.findIndex(
          (perm) => perm.id === action.payload.id,
        );
        if (index !== -1) {
          state.permissions[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePermissionAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })
      // Delete permission
      .addCase(deletePermissionAsync.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deletePermissionAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.permissions = state.permissions.filter(
          (perm) => perm.id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deletePermissionAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectPermissions = (state) => state.permissions.permissions || [];
export const selectPermissionsStatus = (state) => state.permissions.status;
export const selectPermissionsError = (state) => state.permissions.error;
export const selectPermissionsLoading = (state) => state.permissions.loading;

// Actions
export const { clearError, resetStatus } = permissionSlice.actions;

export default permissionSlice.reducer;
