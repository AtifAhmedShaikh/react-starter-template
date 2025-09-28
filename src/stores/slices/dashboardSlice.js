import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandler } from "@/lib/apiWrapper";
import { STATISTICS_APIS } from "@/constants/APIs";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiHandler(STATISTICS_APIS.GET_DASHBOARD_STATISTICS);
      if (!res?.success)
        return rejectWithValue(res.message || "Failed to fetch dashboard data");
      return res.data;
    } catch {
      return rejectWithValue("Something went wrong");
    }
  },
  {
    condition: (params = false, { getState }) => {
      console.log({ params });
      const { dashboard } = getState();
      // Prevent fetch if data already exists
      if (!params) return !dashboard.data;
      return;
    },
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetDashboard: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    // Reusable reducer to update any key in dashboard.data
    updateDashboardKey: (state, action) => {
      const { key, value } = action.payload;
      if (state.data) {
        state.data[key] = value;
      }
    },
    updateTabCountKey: (state, action) => {
      const { key = "", type = "" } = action.payload;
      if (state.data?.tabsCount?.hasOwnProperty(key)) {
        if (type === "increment") {
          state.data.tabsCount[key] += 1;
        } else if (type === "decrement") {
          state.data.tabsCount[key] = Math.max(
            0,
            state.data.tabsCount[key] - 1,
          ); // Prevent negative values
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDashboard, updateDashboardKey, updateTabCountKey } =
  dashboardSlice.actions;
export const selectDashboard = (state) => state.dashboard;
export default dashboardSlice.reducer;
