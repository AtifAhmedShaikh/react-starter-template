import { createSlice } from "@reduxjs/toolkit";

// Modal types object containing all modal names
export const MODAL_TYPES = {
  // Auth modals
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",

  // User modals
  EDIT_PROFILE: "EDIT_PROFILE",
  USER_SETTINGS: "USER_SETTINGS",

  // Generic modals
  CONFIRMATION: "CONFIRMATION",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  INFO: "INFO",

  // Form modals
  CREATE_ITEM: "CREATE_ITEM",
  EDIT_ITEM: "EDIT_ITEM",
  DELETE_ITEM: "DELETE_ITEM",

  // Forward modal (keeping as requested)
  FORWARD_TO: "FORWARD_TO",

  // Generic action modals
  ACTION_MODAL: "ACTION_MODAL",

  // Permission modals
  ADD_PERMISSION: "ADD_PERMISSION",
  EDIT_PERMISSION: "EDIT_PERMISSION",
  DELETE_PERMISSION: "DELETE_PERMISSION",

  // Role modals
  ADD_ROLE: "ADD_ROLE",
  EDIT_ROLE: "EDIT_ROLE",
  DELETE_ROLE: "DELETE_ROLE",

  // Admin modals
  ADD_ADMIN: "ADD_ADMIN",
  EDIT_ADMIN: "EDIT_ADMIN",
  DELETE_ADMIN: "DELETE_ADMIN",
  CHANGE_ADMIN_PASSWORD: "CHANGE_ADMIN_PASSWORD",
  CHANGE_ADMIN_ROLE: "CHANGE_ADMIN_ROLE",
  CHANGE_ADMIN_PROFILE_IMAGE: "CHANGE_ADMIN_PROFILE_IMAGE",
  VIEW_ADMIN_DETAILS: "VIEW_ADMIN_DETAILS",

  // User modals
  ADD_USER: "ADD_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
  CHANGE_USER_PASSWORD: "CHANGE_USER_PASSWORD",
  CHANGE_USER_ROLE: "CHANGE_USER_ROLE",
  CHANGE_USER_PROFILE_IMAGE: "CHANGE_USER_PROFILE_IMAGE",
  VIEW_USER_DETAILS: "VIEW_USER_DETAILS",
};

const initialState = {
  activeModal: null,
  modalData: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload.modalType;
      state.modalData = action.payload.data || null;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
      state.isOpen = false;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalData } = modalSlice.actions;

// Selectors
export const selectActiveModal = (state) => state.modal.activeModal;
export const selectModalData = (state) => state.modal.modalData;
export const selectIsModalOpen = (state) => state.modal.isOpen;
export const selectIsModalOpenByType = (modalType) => (state) =>
  state.modal.activeModal === modalType && state.modal.isOpen;

export default modalSlice.reducer;
