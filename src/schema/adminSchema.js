import * as yup from "yup";

// Admin creation schema
export const adminSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  email: yup
    .string()
    .email("Invalid email address")
    .max(50, "Email must not exceed 50 characters"),

  phoneNumber: yup
    .string()
    .matches(
      /^(\d{4})-(\d{7})$/,
      "Phone number must follow format 03xx-xxxxxxx",
    ),

  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      "CNIC must follow the format xxxxx-xxxxxxx-x",
    ),

  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["MALE", "FEMALE", "OTHER"], "Please select a valid gender"),

  roleId: yup.string().required("Role is required"),

  cityId: yup.string().required("City is required"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must not exceed 500 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

// Admin update schema (without password)
export const adminUpdateSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must not exceed 20 characters"),

  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(
      /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
      "CNIC must be in format: 12345-1234567-1",
    )
    .length(15, "CNIC must be exactly 15 characters"),

  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Please select a valid gender"),

  roleId: yup.string().required("Role is required"),

  cityId: yup.string().required("City is required"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must not exceed 500 characters"),
});

// Change password schema
export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

// Change role schema
export const changeRoleSchema = yup.object().shape({
  roleId: yup.string().required("Role is required"),
});
