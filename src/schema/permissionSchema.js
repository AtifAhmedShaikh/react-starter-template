import * as Yup from "yup";

export const permissionSchema = Yup.object().shape({
  key: Yup.string()
    .required("Permission key is required")
    .matches(/^[a-z_]+$/, "Only lowercase letters and underscores are allowed")
    .max(50, "Permission key must be less than 50 characters"),
  value: Yup.string()
    .required("Permission description is required")
    .max(100, "Permission description must be less than 100 characters"),
});

export const permissionUpdateSchema = Yup.object().shape({
  key: Yup.string()
    .matches(/^[a-z_]+$/, "Only lowercase letters and underscores are allowed")
    .max(50, "Permission key must be less than 50 characters"),
  value: Yup.string().max(
    100,
    "Permission description must be less than 100 characters",
  ),
});
