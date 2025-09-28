import {
  downloadAndPrintComplaintPdfService,
  downloadComplaintPdfService,
  downloadReportPdfService,
} from "@/socket/services/pdfServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDownloading: false,
  isDownloadReportPdf: false,
  isPrinting: false,
  error: null,
};

export const downloadComplaintPdfAsync = createAsyncThunk(
  "pdf/downloadComplaintPdf",
  async (complaintId, { rejectWithValue }) => {
    try {
      await downloadComplaintPdfService(complaintId);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const downloadAndPrintComplaintPdfAsync = createAsyncThunk(
  "pdf/downloadAndPrintComplaintPdf",
  async (complaintId, { rejectWithValue }) => {
    try {
      await downloadAndPrintComplaintPdfService(complaintId);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const downloadReportPdfAsync = createAsyncThunk(
  "pdf/downloadReportPdf",
  async (data, { rejectWithValue }) => {
    try {
      await downloadReportPdfService(data);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Complaint PDF
      .addCase(downloadComplaintPdfAsync.pending, (state) => {
        state.isDownloading = true;
        state.error = null;
      })
      .addCase(downloadComplaintPdfAsync.fulfilled, (state) => {
        state.isDownloading = false;
      })
      .addCase(downloadComplaintPdfAsync.rejected, (state, action) => {
        state.isDownloading = false;
        state.error = action.payload;
      })

      // Print PDF
      .addCase(downloadAndPrintComplaintPdfAsync.pending, (state) => {
        state.isPrinting = true;
        state.error = null;
      })
      .addCase(downloadAndPrintComplaintPdfAsync.fulfilled, (state) => {
        state.isPrinting = false;
      })
      .addCase(downloadAndPrintComplaintPdfAsync.rejected, (state, action) => {
        state.isPrinting = false;
        state.error = action.payload;
      })

      // Report PDF
      .addCase(downloadReportPdfAsync.pending, (state) => {
        state.isDownloadReportPdf = true;
        state.error = null;
      })
      .addCase(downloadReportPdfAsync.fulfilled, (state) => {
        state.isDownloadReportPdf = false;
      })
      .addCase(downloadReportPdfAsync.rejected, (state, action) => {
        state.isDownloadReportPdf = false;
        state.error = action.payload;
      });
  },
});

export const selectPdfState = (state) => state.pdf;
export default pdfSlice.reducer;
