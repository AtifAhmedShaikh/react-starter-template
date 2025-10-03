import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "@/constants";
import { ADMIN_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";

// Initial State
const initialState = {
  admins: [],
  status: "idle",
  error: null,
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
    changePassword: false,
    changeRole: false,
    changeProfileImage: false,
  },
  pagination: {
    page: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  queries: {
    keyword: "",
    page: 1,
    sortBy: "createdAt",
    sortBy: "dsc",
  },
};

// ===================
// Async Thunks
// ===================

export const fetchAdminsAsync = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue, getState }) => {
    const { queries, admins, loading } = getState().admins;
    const queryParams = new URLSearchParams({
      page: queries.page.toString(),
      sortBy: queries.sortBy,
      ...(queries.keyword && { keyword: queries.keyword }),
    });
    if (admins.length > 0) return admins;

    const response = await apiHandler(
      `${ADMIN_APIS.GET_ALL_ADMINS}?${queryParams}`,
      {
        method: HTTP_METHODS.GET,
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const createAdminAsync = createAsyncThunk(
  "admins/createAdmin",
  async (adminData, { rejectWithValue }) => {
    const response = await apiHandler(ADMIN_APIS.CREATE_ADMIN, {
      method: HTTP_METHODS.POST,
      data: adminData,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updateAdminAsync = createAsyncThunk(
  "admins/updateAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(`${ADMIN_APIS.UPDATE_ADMIN}/${id}`, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const deleteAdminAsync = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(`${ADMIN_APIS.DELETE_ADMIN}/${id}`, {
      method: HTTP_METHODS.DELETE,
    });

    if (!response.success) return rejectWithValue(response.message);
    return id;
  },
);

export const changePasswordAsync = createAsyncThunk(
  "admins/changePassword",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(`${ADMIN_APIS.CHANGE_PASSWORD}/${id}`, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const changeRoleAsync = createAsyncThunk(
  "admins/changeRole",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(`${ADMIN_APIS.CHANGE_ROLE}/${id}`, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const changeProfileImageAsync = createAsyncThunk(
  "admins/changeProfileImage",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(
      `${ADMIN_APIS.CHANGE_PROFILE_IMAGE}/${id}`,
      {
        method: HTTP_METHODS.PUT,
        data,
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const getAdminDetailsAsync = createAsyncThunk(
  "admins/getAdminDetails",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(`${ADMIN_APIS.GET_ADMIN_DETAILS}/${id}`, {
      method: HTTP_METHODS.GET,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    updateQuery: (state, action) => {
      const { key, value } = action.payload;
      state.queries[key] = value;
      if (key !== "page") {
        state.queries.page = 1; // Reset to first page when changing filters
      }
    },
    setSort: (state, action) => {
      const field = action.payload;
      if (state.queries.sortBy === field) {
        state.queries.sortBy = state.queries.sortBy === "asc" ? "dsc" : "asc";
      } else {
        state.queries.sortBy = field;
        state.queries.sortBy = "dsc";
      }
    },
    clearFilters: (state) => {
      state.queries = {
        keyword: "",
        page: 1,
        sortBy: "createdAt",
        sortBy: "dsc",
      };
    },
    removeAdminFromStore: (state, action) => {
      state.admins = state.admins.filter(
        (admin) => admin.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Fetch Admins =====
      .addCase(fetchAdminsAsync.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
      })
      .addCase(fetchAdminsAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";
        state.admins = action.payload || [];
        state.pagination = action.payload.pagination || state.pagination;
        state.error = null;
      })
      .addCase(fetchAdminsAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // ===== Create Admin =====
      .addCase(createAdminAsync.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createAdminAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.admins.unshift(action.payload);
        state.error = null;
      })
      .addCase(createAdminAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ===== Update Admin =====
      .addCase(updateAdminAsync.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateAdminAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.admins.findIndex(
          (admin) => admin.id === action.payload.id,
        );
        if (index !== -1) {
          state.admins[index] = { ...state.admins[index], ...action.payload };
        }
        state.error = null;
      })
      .addCase(updateAdminAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ===== Delete Admin =====
      .addCase(deleteAdminAsync.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteAdminAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteAdminAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      })

      // ===== Change Password =====
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading.changePassword = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.loading.changePassword = false;
        state.error = null;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading.changePassword = false;
        state.error = action.payload;
      })

      // ===== Change Role =====
      .addCase(changeRoleAsync.pending, (state) => {
        state.loading.changeRole = true;
      })
      .addCase(changeRoleAsync.fulfilled, (state, action) => {
        state.loading.changeRole = false;
        const index = state.admins.findIndex(
          (admin) => admin.id === action.payload.id,
        );
        if (index !== -1) {
          state.admins[index].role = action.payload.role;
        }
        state.error = null;
      })
      .addCase(changeRoleAsync.rejected, (state, action) => {
        state.loading.changeRole = false;
        state.error = action.payload;
      })

      // ===== Change Profile Image =====
      .addCase(changeProfileImageAsync.pending, (state) => {
        state.loading.changeProfileImage = true;
      })
      .addCase(changeProfileImageAsync.fulfilled, (state, action) => {
        state.loading.changeProfileImage = false;
        const index = state.admins.findIndex(
          (admin) => admin.id === action.payload.id,
        );
        if (index !== -1) {
          state.admins[index].profileImage = action.payload.profileImage;
        }
        state.error = null;
      })
      .addCase(changeProfileImageAsync.rejected, (state, action) => {
        state.loading.changeProfileImage = false;
        state.error = action.payload;
      });
  },
});

// ===================
// Selectors
// ===================

export const selectAdmins = (state) => state.admins.admins || [];
export const selectAdminsStatus = (state) => state.admins.status;
export const selectAdminsError = (state) => state.admins.error;
export const selectAdminsLoading = (state) => state.admins.loading;
export const selectAdminsPagination = (state) => state.admins.pagination;
export const selectAdminsQueries = (state) => state.admins.queries;

// ===================
// Actions
// ===================

export const {
  clearError,
  resetStatus,
  updateQuery,
  setSort,
  clearFilters,
  removeAdminFromStore,
} = adminSlice.actions;

// ===================
// Reducer
// ===================

export default adminSlice.reducer;
