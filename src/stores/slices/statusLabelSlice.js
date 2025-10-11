import { HTTP_METHODS } from "@/constants";
import { STATUS_LABEL_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  statusLabels: [],
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

export const fetchStatusLabelsAsync = createAsyncThunk(
  "statusLabels/fetchStatusLabels",
  async (_, { rejectWithValue, getState }) => {
    const { statusLabels } = getState().statusLabels;
    console.log("[statusLabels]", statusLabels);
    if (statusLabels.length > 0) {
      return statusLabels;
    }
    const response = await apiHandler(STATUS_LABEL_APIS.GET_ALL_STATUS_LABELS, {
      method: HTTP_METHODS.GET,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data || [];
  },
);

export const createStatusLabelAsync = createAsyncThunk(
  "statusLabels/createStatusLabel",
  async (statusLabelData, { rejectWithValue }) => {
    const response = await apiHandler(STATUS_LABEL_APIS.CREATE_STATUS_LABEL, {
      method: HTTP_METHODS.POST,
      data: statusLabelData,
    });

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const updateStatusLabelAsync = createAsyncThunk(
  "statusLabels/updateStatusLabel",
  async ({ id, payload }, { rejectWithValue }) => {
    const response = await apiHandler(
      `${STATUS_LABEL_APIS.UPDATE_STATUS_LABEL}/${id}`,
      {
        method: HTTP_METHODS.PUT,
        data: { ...payload },
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
);

export const deleteStatusLabelAsync = createAsyncThunk(
  "statusLabels/deleteStatusLabel",
  async (id, { rejectWithValue }) => {
    const response = await apiHandler(
      `${STATUS_LABEL_APIS.DELETE_STATUS_LABEL}/${id}`,
      {
        method: HTTP_METHODS.DELETE,
      },
    );

    if (!response.success) return rejectWithValue(response.message);
    return id;
  },
);

const statusLabelSlice = createSlice({
  name: "statusLabels",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    updateStatusLabelInStore: (state, action) => {
      const index = state.statusLabels.findIndex(
        (label) => label.id === action.payload?.id,
      );
      if (index !== -1) {
        state.statusLabels[index] = {
          ...state.statusLabels[index],
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Fetch Status Labels =====
      .addCase(fetchStatusLabelsAsync.pending, (state) => {
        state.loading.fetch = true;
        state.status = "loading";
      })
      .addCase(fetchStatusLabelsAsync.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.status = "succeeded";
        state.statusLabels = action.payload;
        state.error = null;
      })
      .addCase(fetchStatusLabelsAsync.rejected, (state, action) => {
        state.loading.fetch = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // ===== Create Status Label =====
      .addCase(createStatusLabelAsync.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createStatusLabelAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.statusLabels.unshift(action.payload);
        state.error = null;
      })
      .addCase(createStatusLabelAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ===== Update Status Label =====
      .addCase(updateStatusLabelAsync.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateStatusLabelAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.statusLabels.findIndex(
          (label) => label.id === action.payload?.id,
        );
        if (index !== -1) {
          state.statusLabels[index] = {
            ...state.statusLabels[index],
            ...action.payload,
          };
        }
        state.error = null;
      })
      .addCase(updateStatusLabelAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ===== Delete Status Label =====
      .addCase(deleteStatusLabelAsync.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteStatusLabelAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.statusLabels = state.statusLabels.filter(
          (label) => label.id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteStatusLabelAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

// ===================
// Selectors
// ===================

export const selectStatusLabels = (state) =>
  state.statusLabels.statusLabels || [];
export const selectStatusLabelsStatus = (state) => state.statusLabels.status;
export const selectStatusLabelsError = (state) => state.statusLabels.error;
export const selectStatusLabelsLoading = (state) => state.statusLabels.loading;

// ===================
// Actions
// ===================

export const { clearError, resetStatus, updateStatusLabelInStore } =
  statusLabelSlice.actions;

// ===================
// Reducer
// ===================

export default statusLabelSlice.reducer;
