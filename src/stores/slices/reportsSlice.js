import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandler } from "@/lib/apiWrapper";
import { REPORTS_APIS } from "@/constants/APIs";
import { HTTP_METHODS } from "@/constants";

export const fetchReportsAsync = createAsyncThunk(
  "reports/fetchReports",
  async (_, { getState }) => {
    const { filters, page } = getState().reports;
    const res = await apiHandler(REPORTS_APIS.GENERATE_REPORTS, {
      method: HTTP_METHODS.POST,
      data: { ...filters, page },
    });
    if (!res?.success) throw new Error(res?.message);
    return res.data;
  },
);

const initialState = {
  filters: {
    dateRange: { from: null, to: null },
    keyword: "",
    offenceIds: [],
    zoneIds: [],
    typeOfPersonIds: [],
    statusIds: [],
    departmentIds: [],
  },
  page: 1,
  data: null,
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        dateRange: { from: "", to: "" },
        keyword: "",
        offenceIds: [],
        zoneIds: [],
        typeOfPersonIds: [],
        statusIds: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportsAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchReportsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setPage, clearFilters } = reportsSlice.actions;
export const selectReports = (state) => state.reports;
export default reportsSlice.reducer;
