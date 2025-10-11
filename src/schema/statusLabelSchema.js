import * as Yup from "yup";

export const statusLabelSchema = Yup.object().shape({
  userLabel: Yup.string()
    .required("User label is required")
    .max(100, "User label must be less than 100 characters")
    .min(2, "User label must be at least 2 characters"),
  adminLabel: Yup.string()
    .required("Admin label is required")
    .max(100, "Admin label must be less than 100 characters")
    .min(2, "Admin label must be at least 2 characters"),
  originalStatus: Yup.string()
    .required("Original status is required")
    .max(50, "Original status must be less than 50 characters"),
  description: Yup.string()
    .max(500, "Description must be less than 500 characters")
    .nullable(),
  bgColor: Yup.string()
    .required("Background color is required")
    .matches(/^#[0-9A-Fa-f]{6}$/, "Invalid background color format"),
  textColor: Yup.string()
    .required("Text color is required")
    .matches(/^#[0-9A-Fa-f]{6}$/, "Invalid text color format"),
  borderColor: Yup.string()
    .required("Border color is required")
    .matches(/^#[0-9A-Fa-f]{6}$/, "Invalid border color format"),
});

export const statusLabelUpdateSchema = Yup.object().shape({
  userLabel: Yup.string()
    .max(100, "User label must be less than 100 characters")
    .min(2, "User label must be at least 2 characters"),
  adminLabel: Yup.string()
    .max(100, "Admin label must be less than 100 characters")
    .min(2, "Admin label must be at least 2 characters"),
  description: Yup.string()
    .max(500, "Description must be less than 500 characters")
    .nullable(),
  bgColor: Yup.string().matches(
    /^#[0-9A-Fa-f]{6}$/,
    "Invalid background color format",
  ),
  textColor: Yup.string().matches(
    /^#[0-9A-Fa-f]{6}$/,
    "Invalid text color format",
  ),
  borderColor: Yup.string().matches(
    /^#[0-9A-Fa-f]{6}$/,
    "Invalid border color format",
  ),
});
