import * as Yup from "yup";

export const roleSchema = Yup.object().shape({
  key: Yup.string()
    .required("Role key is required")
    .matches(/^[a-z_]+$/, "Only lowercase letters and underscores are allowed")
    .max(50, "Role key must be less than 50 characters"),
  value: Yup.string()
    .required("Role value is required")
    .max(200, "Role value must be less than 200 characters"),
  description: Yup.string()
    .max(200, "Role description must be less than 200 characters")
    .min(10, "Role description must be at least 10 characters"),
});

export const roleUpdateSchema = Yup.object().shape({
  key: Yup.string().max(50, "Role key must be less than 50 characters"),
  value: Yup.string().max(200, "Role value must be less than 200 characters"),
  description: Yup.string()
    .max(200, "Role description must be less than 200 characters")
    .min(10, "Role description must be at least 10 characters"),
});
