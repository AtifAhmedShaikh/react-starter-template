import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCitiesAsync = createAsyncThunk(
  "metadata/cities",
  async (_, { getState, rejectWithValue }) => {
    const { cities, loading } = getState().metadata;
    if (cities && cities.length > 0 && !loading.cities) return { cities };
    const res = await apiHandler("/api/metadata/getAllCities", {
      method: "GET",
    });
    if (res.success) return { cities: res.data };
    return rejectWithValue(res.message);
  },
);

// Generic location fetch for any level
export const fetchLocationByIdAsync = createAsyncThunk(
  "metadata/locationById",
  async (data, { rejectWithValue }) => {
    const res = await apiHandler("/api/metadata/getLocationsByLevel", {
      method: "GET",
      params: data,
    });
    if (res.success) return Array.isArray(res.data) ? res.data : [];
    return rejectWithValue(res.message);
  },
);

// Initial state
const initialState = {
  cities: [],
  locationById: [],
  loading: {
    cities: false,
    locationById: false,
  },
  error: {
    cities: null,
    locationById: null,
  },
};

// Slice
const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesAsync.pending, (state) => {
        state.loading.cities = true;
        state.error.cities = null;
      })
      .addCase(fetchCitiesAsync.fulfilled, (state, action) => {
        state.loading.cities = false;
        state.error.cities = null;
        state.cities = action.payload.cities || [];
      })
      .addCase(fetchCitiesAsync.rejected, (state, action) => {
        state.loading.cities = false;
        state.error.cities = action.payload || "Failed to fetch cities";
      })
      .addCase(fetchLocationByIdAsync.pending, (state) => {
        state.loading.locationById = true;
        state.error.locationById = null;
      })
      .addCase(fetchLocationByIdAsync.fulfilled, (state, action) => {
        state.loading.locationById = false;
        state.error.locationById = null;
        state.locationById = action.payload;
      })
      .addCase(fetchLocationByIdAsync.rejected, (state, action) => {
        state.loading.locationById = false;
        state.error.locationById =
          action.payload || "Failed to fetch locationById";
      });
  },
});

// Selectors
export const selectCities = (state) => state.metadata.cities;
export const selectLocationById = (state) => state.metadata.locationById;

export const selectCitiesLoading = (state) => state.metadata.loading.cities;
export const selectLocationByIdLoading = (state) =>
  state.metadata.loading.locationById;

export const selectCitiesError = (state) => state.metadata.error.cities;
export const selectLocationByIdError = (state) =>
  state.metadata.error.locationById;

// No custom reducers, so no actions to export
export default metadataSlice.reducer;
