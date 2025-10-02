import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "@/constants";
import { PERMISSION_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";

// Initial State
const initialState = {
  permissions: [],
  status: "idle",
  error: null,
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
  },
};

// ===================
// Async Thunks
// ===================

export const fetchPermissionsAsync = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue, getState }) => {
    const { permissions } = getState().permissions;
    if (permissions.length > 0) {
      return permissions;
    }
    const response = await apiHandler(PERMISSION_APIS.GET_ALL_PERMISSIONS, {
      method: HTTP_METHODS.GET,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data || [];
  },
);

export const createPermissionAsync = createAsyncThunk(
  "permissions/createPermission",
  async (permissionData, { rejectWithValue }) => {
    const response = await apiHandler(PERMISSION_APIS.CREATE_PERMISSION, {
      method: HTTP_METHODS.POST,
      data: permissionData,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updatePermissionAsync = createAsyncThunk(
  "permissions/updatePermission",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(
      `${PERMISSION_APIS.UPDATE_PERMISSION}/${id}`,
      {
        method: HTTP_METHODS.PUT,
        data,
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const deletePermissionAsync = createAsyncThunk(
  "permissions/deletePermission",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(
      `${PERMISSION_APIS.DELETE_PERMISSION}/${id}`,
      {
        method: HTTP_METHODS.DELETE,
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return id;
  },
);

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
      // ===== Fetch Permissions =====
      .addCase(fetchPermissionsAsync.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
      })
      .addCase(fetchPermissionsAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";
        state.permissions = action.payload;
        state.error = null;
      })
      .addCase(fetchPermissionsAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // ===== Create Permission =====
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

      // ===== Update Permission =====
      .addCase(updatePermissionAsync.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePermissionAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.permissions.findIndex(
          (perm) => perm.id === action.payload?.permission.id,
        );
        if (index !== -1) state.permissions[index] = action.payload?.permission;
        state.error = null;
      })
      .addCase(updatePermissionAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ===== Delete Permission =====
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

// ===================
// Selectors
// ===================

export const selectPermissions = (state) => state.permissions.permissions || [];
export const selectPermissionsStatus = (state) => state.permissions.status;
export const selectPermissionsError = (state) => state.permissions.error;
export const selectPermissionsLoading = (state) => state.permissions.loading;

// ===================
// Actions
// ===================

export const { clearError, resetStatus } = permissionSlice.actions;

// ===================
// Reducer
// ===================

export default permissionSlice.reducer;
