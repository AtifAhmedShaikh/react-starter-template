import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "@/constants";
import { ROLE_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";

// Initial State
const initialState = {
  roles: [],
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

export const fetchRolesAsync = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue, getState }) => {
    const { roles } = getState().roles;
    console.log("[roles]", roles);
    if (roles.length > 0) {
      return roles;
    }
    const response = await apiHandler(ROLE_APIS.GET_ALL_ROLES, {
      method: HTTP_METHODS.GET,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data || [];
  },
);

export const createRoleAsync = createAsyncThunk(
  "roles/createRole",
  async (roleData, { rejectWithValue }) => {
    const response = await apiHandler(ROLE_APIS.CREATE_ROLE, {
      method: HTTP_METHODS.POST,
      data: roleData,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updateRoleAsync = createAsyncThunk(
  "roles/updateRole",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(`${ROLE_APIS.UPDATE_ROLE}/${id}`, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const deleteRoleAsync = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(`${ROLE_APIS.DELETE_ROLE}/${id}`, {
      method: HTTP_METHODS.DELETE,
    });

    if (!response.success) return rejectWithValue(response.message);
    return id;
  },
);

const roleSlice = createSlice({
  name: "roles",
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
      // ===== Fetch Roles =====
      .addCase(fetchRolesAsync.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";
        state.roles = action.payload;
        state.error = null;
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // ===== Create Role =====
      .addCase(createRoleAsync.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createRoleAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.roles.unshift(action.payload);
        state.error = null;
      })
      .addCase(createRoleAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ===== Update Role =====
      .addCase(updateRoleAsync.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.roles.findIndex(
          (role) => role.id === action.payload?.id,
        );
        const updatedInfo = {
          key: action.payload?.key,
          value: action.payload?.value,
          description: action.payload?.description,
        };
        if (index !== -1)
          state.roles[index] = { ...state.roles[index], ...updatedInfo };
        state.error = null;
      })
      .addCase(updateRoleAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ===== Delete Role =====
      .addCase(deleteRoleAsync.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteRoleAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

// ===================
// Selectors
// ===================

export const selectRoles = (state) => state.roles.roles || [];
export const selectRolesStatus = (state) => state.roles.status;
export const selectRolesError = (state) => state.roles.error;
export const selectRolesLoading = (state) => state.roles.loading;

// ===================
// Actions
// ===================

export const { clearError, resetStatus } = roleSlice.actions;

// ===================
// Reducer
// ===================

export default roleSlice.reducer;
