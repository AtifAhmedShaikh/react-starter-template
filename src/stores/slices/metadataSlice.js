import { METADATA_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const fetchCitiesAsync = createAsyncThunk(
  "metadata/cities",
  async (_, { getState, rejectWithValue }) => {
    const { cities } = getState().metadata;
    // if cities are already fetched, return them
    if (cities?.data?.length > 0) {
      return { cities: null };
    }
    // if cities are not fetched, fetch them
    const res = await apiHandler(METADATA_APIS.GET_ALL_CITIES);
    if (res.success) return { cities: res.data };
    toast.error(res.message);
    return rejectWithValue(res.message);
  },
);

const initialState = {
  cities: { data: [], loading: false, error: null },
};

// Slice
const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesAsync.pending, (state) => {
        state.cities.loading = true;
        state.cities.error = null;
      })
      .addCase(fetchCitiesAsync.fulfilled, (state, action) => {
        state.cities.loading = false;
        state.cities.data = action.payload.cities || [];
      })
      .addCase(fetchCitiesAsync.rejected, (state, action) => {
        state.cities.loading = false;
        state.cities.error = action.payload || "Failed to fetch cities";
      });
  },
});

export const selectCities = (state) => state.metadata.cities;

// No custom reducers, so no actions to export
export default metadataSlice.reducer;
