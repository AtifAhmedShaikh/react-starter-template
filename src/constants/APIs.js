export const AUTH_APIS = {
  REGISTER_USER: "/api/auth/register",
  VERIFY_ACCOUNT: "/api/auth/verify-account",
  RESEND_OTP: "/api/auth/resend-otp",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  CHECK_AUTH: "/api/auth/check-auth",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  CHANGE_PASSWORD: "/api/users/change-password",
  UPDATE_ACCOUNT: "/api/users/update-account",
  UPDATE_ACCOUNT_SENSITIVE_FIELDS: "/api/users/update-account-sensitive",
  REQUEST_OTP: "/api/auth/request-otp",
  CHANGE_PROFILE_IMAGE: "/api/users/change-profile-image",
};

export const COMPLAINT_APIS = {
  GET_TRACK_COMPLAINTS: "/api/complaints/trackComplaints",
  GET_COMPLAINT_BY_ID: "/api/complaints/complaintDetails",
  GET_COMPLAINT_TRACKING_INFO: "/api/complaints/complaintTrackingInformation",
  LODGED_COMPLAINT: "/api/complaints/lodgeComplaint",
  LODGED_OPEN_COMPLAINT: "/api/complaints/lodgeOpenComplaint",
  NEW_COMPLAINTS: "/api/complaints/newComplaints",
  FORWARDED_COMPLAINTS: "/api/complaints/forwardedComplaints",
  GET_CHARGES_FOR_FORWARDING: "/api/charges/getAllAssignedCharges",
  FORWARD_COMPLAINT: "/api/forward/forwardComplaint",
  CREATE_FOLLOW_UP: "/api/complaints/followUpMessage",
  GET_ELIGIBLE_USERS_FOR_FORWARDING: "/api/forward/getEligibleForForward",
  GET_METADATA_FOR_FORWARDING: "/api/forward/metadata",
  CHANGE_STATUS: "/api/complaints/changeStatus",
  GET_DISPOSED_COMPALINTS: "/api/complaints/disposedComplaints",
  GET_COMPLAINTS_BY_COMPLAINANT_ID:
    "/api/complaints/getAllComplaintsOfComplainant",
  GET_USER_BY_ID: "/api/complaints/getComplainantById",
  GET_COMPLAINER_DETAILS: "/api/complaints/getComplainantDetails",
  FORWARD_BACK: "/api/forward/returnComplaint",
  GET_RESOLVED_COMPALINTS: "/api/complaints/resolvedComplaints",
  GET_ALL_COMPALINTS: "/api/complaints/allComplaints",
  SEARCH_COMPLAINANT_WITH_CNIC: "/api/users/search-complainant-by-cnic",
  CREATE_GROUPED: "/api/complaints/groupByRefNo",
  GET_COMMITTIEE_LOCATIONS: "/api/forward/locationsByLevel",
  GET_LOCATIONS_BY_LEVEL: "/api/forward/locationsByLevel",
  GET_LOCATION_CORRESPONDING_COMMITTIEES:
    "/api/forward/locationCorrespondingCommttiee",
  GET_LOCATION_CORRESPONDING_CHARGES:
    "/api/forward/locationCorrespondingCharges",
  GET_GROUP_COMAPLAINTS: "/api/complaints/getComplaintsByGroupId",
  GET_SIMILAR_COMPLAINTS: "/api/complaints/getSimilarComplaint",
};

export const USER_SETTINGS_APIS = {
  GET_USER_SETTINGS: "/api/user-settings",
  UPDATE_USER_SETTINGS: "/api/user-settings",
};

export const WEB3_FORM_APIS = {
  SUBMIT_FORM: "https://api.web3forms.com/submit",
};

export const REPORTS_APIS = {
  GENERATE_REPORTS: "/api/reports/generateReports",
};

export const STATISTICS_APIS = {
  GET_DASHBOARD_STATISTICS: "/api/stats/dashboard-statistics",
};

export const METADATA_APIS = {
  GET_ALL_CITIES: "/api/metadata/cities",
};

export const PERMISSION_APIS = {
  GET_ALL_PERMISSIONS: "/api/rolePermissions/getAllPermissions",
  CREATE_PERMISSION: "/api/rolePermissions/createPermission",
  UPDATE_PERMISSION: "/api/rolePermissions/updatePermission",
  DELETE_PERMISSION: "/api/rolePermissions/deletePermission",
  EXPORT_PERMISSIONS: "/api/exports/exportPermissions",
  IMPORT_PERMISSIONS: "/api/imports/importPermissions",
};
