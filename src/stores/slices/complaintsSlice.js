import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaints: [],
  eligibleForwardingUsers: [],
  status: "idle",
  error: null,
  selectedComplaint: null,
  charges: [],
  roles: [],
};

// ─── Async Thunks ───────────────────────────────────────────────

export const fetchChargesForForwardAsync = createAsyncThunk(
  "complaints/fetchChargesForForward",
  async (_, { rejectWithValue }) => {
    const response = await apiHandler(
      COMPLAINT_APIS.GET_CHARGES_FOR_FORWARDING,
    );
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { complaints } = getState();
      return !complaints?.charges?.length;
    },
  },
);

export const fetchEligibleUsersAsync = createAsyncThunk(
  "complaints/fetchEligibleUsers",
  async (_, { rejectWithValue }) => {
    const response = await apiHandler(
      COMPLAINT_APIS.GET_ELIGIBLE_USERS_FOR_FORWARDING,
    );
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { complaints } = getState();
      return !complaints?.eligibleForwardingUsers?.length;
    },
  },
);

export const fetchMetadataForForwardAsync = createAsyncThunk(
  "complaints/fetchMetadataForForward",
  async (_, { rejectWithValue }) => {
    const response = await apiHandler(
      COMPLAINT_APIS.GET_METADATA_FOR_FORWARDING,
    );
    if (!response.success) return rejectWithValue(response.message);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { complaints } = getState();
      return !(complaints?.charges?.length && complaints?.roles?.length);
    },
  },
);

// ─── Slice ─────────────────────────────────────────────────────

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    setSelectedComplaint: (state, action) => {
      state.selectedComplaint = action.payload;
    },
    clearSelectedComplaint: (state) => {
      state.selectedComplaint = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Charges
      .addCase(fetchChargesForForwardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChargesForForwardAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.charges = action.payload || [];
      })
      .addCase(fetchChargesForForwardAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Eligible Users
      .addCase(fetchEligibleUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEligibleUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.eligibleForwardingUsers = action.payload || [];
      })
      .addCase(fetchEligibleUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Metadata (roles + charges)
      .addCase(fetchMetadataForForwardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMetadataForForwardAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.charges = action.payload?.charges || [];
        state.roles = action.payload?.roles || [];
      })
      .addCase(fetchMetadataForForwardAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// ─── Selectors ─────────────────────────────────────────────────

export const selectComplaints = (state) => state.complaints.complaints || [];
export const selectComplaintStatus = (state) =>
  state.complaints.status || "idle";
export const selectSelectedComplaint = (state) =>
  state.complaints.selectedComplaint;
export const selectCharges = (state) => state.complaints.charges || [];
export const selectRoles = (state) => state.complaints.roles || [];
export const selectEligibleUsers = (state) =>
  state.complaints.eligibleForwardingUsers || [];

// ─── Actions & Reducer ─────────────────────────────────────────

export const { setSelectedComplaint, clearSelectedComplaint } =
  complaintsSlice.actions;

export default complaintsSlice.reducer;
