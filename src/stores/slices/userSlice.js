import { HTTP_METHODS } from "@/constants";
import { USER_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  users: [],
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
    sortAt: "createdAt",
    sortBy: "desc",
  },
};

// ===================
// Async Thunks
// ===================

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    const { queries, users, loading } = getState().users;
    const queryParams = new URLSearchParams({
      page: queries.page.toString(),
      sortAt: queries.sortAt,
      ...(queries.keyword && { keyword: queries.keyword }),
    });
    if (users.length > 0) return users;

    const response = await apiHandler(
      `${USER_APIS.GET_ALL_USERS}?${queryParams}`,
      {
        method: HTTP_METHODS.GET,
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    const response = await apiHandler(USER_APIS.CREATE_USER, {
      method: HTTP_METHODS.POST,
      data: userData,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apiHandler(USER_APIS.UPDATE_USER, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(`${USER_APIS.DELETE_USER}/${id}`, {
      method: HTTP_METHODS.DELETE,
    });

    if (!response.success) return rejectWithValue(response.message);
    return id;
  },
);

export const changePasswordAsync = createAsyncThunk(
  "users/changePassword",
  async ({ data }, { rejectWithValue }) => {
    const response = await apiHandler(USER_APIS.CHANGE_PASSWORD, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const changeRoleAsync = createAsyncThunk(
  "users/changeRole",
  async ({ data }, { rejectWithValue }) => {
    const response = await apiHandler(USER_APIS.CHANGE_ROLE, {
      method: HTTP_METHODS.PUT,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const changeProfileImageAsync = createAsyncThunk(
  "users/changeProfileImage",
  async ({ data }, { rejectWithValue }) => {
    const response = await apiHandler(USER_APIS.CHANGE_PROFILE_IMAGE, {
      method: HTTP_METHODS.POST,
      data,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const getUserDetailsAsync = createAsyncThunk(
  "users/getUserDetails",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(`${USER_APIS.GET_USER_DETAILS}/${id}`, {
      method: HTTP_METHODS.GET,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

const userSlice = createSlice({
  name: "users",
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
      if (state.queries.sortAt === field) {
        state.queries.sortBy = state.queries.sortBy === "asc" ? "dsc" : "asc";
      } else {
        state.queries.sortAt = field;
        state.queries.sortBy = "desc";
      }
    },
    clearFilters: (state) => {
      state.queries = {
        keyword: "",
        page: 1,
        sortAt: "createdAt",
        sortBy: "desc",
      };
    },
    removeUserFromStore: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Fetch Users =====
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";
        state.users = action.payload || [];
        state.pagination = action.payload.pagination || state.pagination;
        state.error = null;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // ===== Create User =====
      .addCase(createUserAsync.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.users.unshift(action.payload);
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ===== Update User =====
      .addCase(updateUserAsync.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ===== Delete User =====
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
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
        const index = state.users.findIndex(
          (user) => user.id === action.payload.userId,
        );
        if (index !== -1) {
          state.users[index].role = action.payload.role;
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
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index].profileImage = action.payload.profileImage;
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

export const selectUsers = (state) => state.users.users || [];
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersPagination = (state) => state.users.pagination;
export const selectUsersQueries = (state) => state.users.queries;

// ===================
// Actions
// ===================

export const {
  clearError,
  resetStatus,
  updateQuery,
  setSort,
  clearFilters,
  removeUserFromStore,
} = userSlice.actions;

// ===================
// Reducer
// ===================

export default userSlice.reducer;
