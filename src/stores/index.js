import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import metadataReducer from "./slices/metadataSlice";
import complaintReducer from "./slices/complaintsSlice";
import socketReducer from "./slices/socketSlice"; // Import socket slice
import notificationsReducer from "./slices/notificationSlice";
import { combineReducers } from "@reduxjs/toolkit";
import pdfReducer from "./slices/pdfSlice";
import reportsReducer from "./slices/reportsSlice";
import dashboardReducer from "./slices/dashboardSlice";
import modalReducer from "./slices/modalSlice";
import permissionReducer from "./slices/permissionSlice";
import roleReducer from "./slices/roleSlice";

const appReducer = combineReducers({
  auth: authReducer,
  metadata: metadataReducer,
  complaints: complaintReducer,
  socket: socketReducer,
  notifications: notificationsReducer,
  pdf: pdfReducer,
  reports: reportsReducer,
  dashboard: dashboardReducer,
  modal: modalReducer,
  permissions: permissionReducer,
  roles: roleReducer,
});

// Root reducer that resets all slices
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // reset to default initial states of slices
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
