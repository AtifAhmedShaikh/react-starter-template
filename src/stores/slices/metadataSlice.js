import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStatusAsync = createAsyncThunk(
  "metadata/status",
  async (_, { getState, rejectWithValue }) => {
    const { status } = getState().metadata;
    if (status && status.length > 0) return { status };
    const res = await apiHandler("/api/metadata/getAllStatus", {
      method: "GET",
    });
    if (res.success) return { status: res.data };
    return rejectWithValue(res.message);
  },
);

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

export const fetchDivisionsAsync = createAsyncThunk(
  "metadata/divisions",
  async (_, { getState, rejectWithValue }) => {
    const { divisions } = getState().metadata;
    if (divisions && divisions.length > 0) return { divisions };
    const res = await apiHandler("/api/metadata/getAllDivisions", {
      method: "GET",
    });
    if (res.success) return { divisions: res.data };
    return rejectWithValue(res.message);
  },
);

export const fetchDepartmentsAsync = createAsyncThunk(
  "metadata/departments",
  async (_, { getState, rejectWithValue }) => {
    const { departments } = getState().metadata;
    if (departments && departments.length > 0) return { departments };
    const res = await apiHandler("/api/metadata/getAllDepartments", {
      method: "GET",
    });
    if (res.success) return { departments: res.data };
    return rejectWithValue(res.message);
  },
);

export const fetchOffencesAsync = createAsyncThunk(
  "metadata/offences",
  async (_, { getState, rejectWithValue }) => {
    const { offences } = getState().metadata;
    if (offences && offences.length > 0) return { offences };
    const res = await apiHandler("/api/metadata/getAllOffences", {
      method: "GET",
    });
    if (res.success) return { offences: res.data };
    return rejectWithValue(res.message);
  },
);

export const fetchTypeOfPersonsAsync = createAsyncThunk(
  "metadata/typeOfPersons",
  async (_, { getState, rejectWithValue }) => {
    const { typeOfPersons } = getState().metadata;
    if (typeOfPersons && typeOfPersons.length > 0) return { typeOfPersons };
    const res = await apiHandler("/api/metadata/getAllTypeOfPersons", {
      method: "GET",
    });
    if (res.success) return { typeOfPersons: res.data };
    return rejectWithValue(res.message);
  },
);

export const fetchZonesAsync = createAsyncThunk(
  "metadata/zones",
  async (_, { getState, rejectWithValue }) => {
    const { zones } = getState().metadata;
    if (zones && zones.length > 0) return { zones };
    const res = await apiHandler("/api/metadata/getAllZones", {
      method: "GET",
    });
    if (res.success) return { zones: res.data };
    return rejectWithValue(res.message);
  },
);

export const fetchRolesAsync = createAsyncThunk(
  "metadata/roles",
  async (_, { getState, rejectWithValue }) => {
    const { roles } = getState().metadata;
    if (roles && roles?.length > 0) return { zones };
    const res = await apiHandler("/api/metadata/getAllRoles", {
      method: "GET",
    });
    if (res.success) return { roles: Array.isArray(res.data) ? res.data : [] };
    return rejectWithValue(res.message);
  },
);

export const fetchLocationByIdAsync = createAsyncThunk(
  "metadata/locationById",
  async (data, { rejectWithValue }) => {
    const res = await apiHandler(COMPLAINT_APIS.GET_LOCATIONS_BY_LEVEL, {
      method: "GET",
      params: data,
    });
    if (res.success) return Array.isArray(res.data) ? res.data : [];
    return rejectWithValue(res.message);
  },
);

export const fetchChargesByLocationAsync = createAsyncThunk(
  "metadata/chargesByLocation",
  async (locationId, { rejectWithValue }) => {
    const res = await apiHandler(
      COMPLAINT_APIS.GET_LOCATION_CORRESPONDING_CHARGES,
      {
        method: "GET",
        params: { id: locationId },
      },
    );
    if (res.success)
      return {
        selectedLocationCharges: Array.isArray(res.data) ? res.data : [],
      };
    return rejectWithValue(res.message);
  },
);

export const fetchForwardDetailsAsync = createAsyncThunk(
  "metadata/forwardDetails",
  async (complaintId, { rejectWithValue }) => {
    try {
      // const { forwardDetails } = getState().metadata;
      // if (forwardDetails?.roles?.length > 0) return { forwardDetails };

      const res = await apiHandler(`/api/forward/metadata`, {
        method: "GET",
        params: { id: complaintId },
      });
      console.log("Getting the response", res);

      if (res.success) {
        return { forwardDetails: res.data };
      }
      return rejectWithValue(res.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchForwardToCommittieeDetailsAsync = createAsyncThunk(
  "metadata/forwardACECommitteeDetails",
  async (complaintId, { rejectWithValue }) => {
    try {
      const res = await apiHandler(`/api/forward/committee`, {
        method: "GET",
        params: { id: complaintId },
      });

      if (res.success) {
        return { accCommittees: res.data };
      }
      return rejectWithValue(res.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Initial state
const initialState = {
  accCommittees: [],
  cities: [],
  divisions: [],
  districts: [],
  departments: [],
  offences: [],
  typeOfPersons: [],
  zones: [],
  status: [],
  roles: [],
  locationById: [],
  forwardDetails: {},
  loading: {
    cities: false,
    divisions: false,
    districts: false,
    departments: false,
    offences: false,
    typeOfPersons: false,
    zones: false,
    status: false,
    roles: false,
    locationById: false,
    forwardDetails: false,
  },
  error: {
    cities: null,
    divisions: null,
    districts: null,
    departments: null,
    offences: null,
    typeOfPersons: null,
    zones: null,
    status: null,
    roles: null,
    locationById: null,
    forwardDetails: null,
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

      .addCase(fetchDivisionsAsync.pending, (state) => {
        state.loading.divisions = true;
        state.error.divisions = null;
      })
      .addCase(fetchDivisionsAsync.fulfilled, (state, action) => {
        state.loading.divisions = false;
        state.error.divisions = null;
        state.divisions = action.payload.divisions || [];
      })
      .addCase(fetchDivisionsAsync.rejected, (state, action) => {
        state.loading.divisions = false;
        state.error.divisions = action.payload || "Failed to fetch divisions";
      })

      .addCase(fetchDepartmentsAsync.pending, (state) => {
        state.loading.departments = true;
        state.error.departments = null;
      })
      .addCase(fetchDepartmentsAsync.fulfilled, (state, action) => {
        state.loading.departments = false;
        state.error.departments = null;
        console.log(action.payload);
        state.departments = action.payload.departments || [];
      })
      .addCase(fetchDepartmentsAsync.rejected, (state, action) => {
        state.loading.departments = false;
        state.error.departments =
          action.payload || "Failed to fetch departments";
      })

      .addCase(fetchOffencesAsync.pending, (state) => {
        state.loading.offences = true;
        state.error.offences = null;
      })
      .addCase(fetchOffencesAsync.fulfilled, (state, action) => {
        state.loading.offences = false;
        state.error.offences = null;
        state.offences = action.payload.offences || [];
      })
      .addCase(fetchOffencesAsync.rejected, (state, action) => {
        state.loading.offences = false;
        state.error.offences = action.payload || "Failed to fetch offences";
      })

      .addCase(fetchTypeOfPersonsAsync.pending, (state) => {
        state.loading.typeOfPersons = true;
        state.error.typeOfPersons = null;
      })
      .addCase(fetchTypeOfPersonsAsync.fulfilled, (state, action) => {
        state.loading.typeOfPersons = false;
        state.error.typeOfPersons = null;
        state.typeOfPersons = action.payload.typeOfPersons || [];
      })
      .addCase(fetchTypeOfPersonsAsync.rejected, (state, action) => {
        state.loading.typeOfPersons = false;
        state.error.typeOfPersons =
          action.payload || "Failed to fetch type of persons";
      })

      .addCase(fetchZonesAsync.pending, (state) => {
        state.loading.zones = true;
        state.error.zones = null;
      })
      .addCase(fetchZonesAsync.fulfilled, (state, action) => {
        state.loading.zones = false;
        state.error.zones = null;
        state.zones = action.payload.zones || [];
      })
      .addCase(fetchZonesAsync.rejected, (state, action) => {
        state.loading.zones = false;
        state.error.zones = action.payload || "Failed to fetch zones";
      })

      .addCase(fetchRolesAsync.pending, (state) => {
        state.loading.roles = true;
        state.error.roles = null;
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.loading.roles = false;
        state.error.roles = null;
        state.roles = action.payload.roles || [];
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.loading.roles = false;
        state.error.roles = action.payload || "Failed to fetch zones";
      })

      .addCase(fetchStatusAsync.pending, (state) => {
        state.loading.status = true;
        state.error.status = null;
      })
      .addCase(fetchStatusAsync.fulfilled, (state, action) => {
        state.loading.status = false;
        state.error.status = null;
        state.status = action.payload.status || [];
      })
      .addCase(fetchStatusAsync.rejected, (state, action) => {
        state.loading.status = false;
        state.error.status = action.payload || "Failed to fetch status";
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
      })

      .addCase(fetchForwardDetailsAsync.pending, (state) => {
        state.loading.forwardDetails = true;
        state.error.forwardDetails = null;
      })
      .addCase(fetchForwardDetailsAsync.fulfilled, (state, action) => {
        state.loading.forwardDetails = false;

        state.error.forwardDetails = null;
        state.forwardDetails = action.payload?.forwardDetails || {};
      })
      .addCase(fetchForwardDetailsAsync.rejected, (state, action) => {
        state.loading.forwardDetails = false;
        state.error.forwardDetails =
          action.payload || "Failed to fetch forwardDetails";
      })
      .addCase(fetchForwardToCommittieeDetailsAsync.pending, (state) => {
        state.loading.forwardDetails = true;
        state.error.forwardDetails = null;
      })
      .addCase(
        fetchForwardToCommittieeDetailsAsync.fulfilled,
        (state, action) => {
          state.loading.forwardDetails = false;

          state.accCommittees = action.payload?.accCommittees || {};
        },
      )
      .addCase(
        fetchForwardToCommittieeDetailsAsync.rejected,
        (state, action) => {
          state.loading.forwardDetails = false;
          state.error.forwardDetails =
            action.payload || "Failed to fetch forwardDetails";
        },
      );
  },
});

// Selectors
export const selectCities = (state) => state.metadata.cities;
export const selectDivisions = (state) => state.metadata.divisions;
export const selectDistricts = (state) => state.metadata.districts;
export const selectDepartments = (state) => state.metadata.departments;
export const selectOffences = (state) => state.metadata.offences;
export const selectTypeOfPersons = (state) => state.metadata.typeOfPersons;
export const selectZones = (state) => state.metadata.zones;
export const selectStatus = (state) => state.metadata.status;
export const selectRoles = (state) => state.metadata.roles;
export const selectLocationById = (state) => state.metadata.locationById;
export const selectForwardDetails = (state) => state.metadata.forwardDetails;
export const selectACCCommittees = (state) => state.metadata.accCommittees;

export const selectCitiesLoading = (state) => state.metadata.loading.cities;
export const selectDivisionsLoading = (state) =>
  state.metadata.loading.divisions;
export const selectDistrictsLoading = (state) =>
  state.metadata.loading.districts;
export const selectDepartmentsLoading = (state) =>
  state.metadata.loading.departments;
export const selectOffencesLoading = (state) => state.metadata.loading.offences;
export const selectTypeOfPersonsLoading = (state) =>
  state.metadata.loading.typeOfPersons;
export const selectZonesLoading = (state) => state.metadata.loading.zones;
export const selectStatusLoading = (state) => state.metadata.loading.status;
export const selectRolesLoading = (state) => state.metadata.loading.roles;
export const selectLocationByIdLoading = (state) =>
  state.metadata.loading.locationById;
export const selectForwardDetailsLoading = (state) =>
  state.metadata.loading.forwardDetails;

export const selectCitiesError = (state) => state.metadata.error.cities;
export const selectDivisionsError = (state) => state.metadata.error.divisions;
export const selectDistrictsError = (state) => state.metadata.error.districts;
export const selectDepartmentsError = (state) =>
  state.metadata.error.departments;
export const selectOffencesError = (state) => state.metadata.error.offences;
export const selectTypeOfPersonsError = (state) =>
  state.metadata.error.typeOfPersons;
export const selectZonesError = (state) => state.metadata.error.zones;
export const selectStatusError = (state) => state.metadata.error.status;
export const selectRolesError = (state) => state.metadata.error.roles;
export const selectLocationByIdError = (state) =>
  state.metadata.error.locationById;
export const selectForwardDetailsError = (state) =>
  state.metadata.error.forwardDetails;

// No custom reducers, so no actions to export
export default metadataSlice.reducer;
