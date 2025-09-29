import * as yup from "yup";

export const contactUsFormSchema = yup.object().shape({
  name: yup.string().required("Name is required / نام ضروری ہے"),
  email: yup
    .string()
    .email("Enter a valid email / درست ای میل درج کریں")
    .required("Email is required / ای میل ضروری ہے"),
  message: yup
    .string()
    .required("Message is required / پیغام ضروری ہے")
    .min(
      10,
      "Message must be at least 10 characters / پیغام کم از کم 10 حروف کا ہونا چاہیے",
    ),
});

export const userRegisterSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30)
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces allowed"),
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, "Format: xxxxx-xxxxxxx-x"),
  email: yup.string().email().max(50).notRequired(),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^(\d{4})-(\d{7})$/, "Format: 0300-0000000"),
  gender: yup.string().required("Gender is required"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),
  cityId: yup.string().required("City is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6)
    .required()
    .max(30, "Password must not exceed 30 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

export const loginSchema = yup.object().shape({
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, "Format: xxxxx-xxxxxxx-x"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters")
    .max(30, "Maximum 30 characters"),
  rememberMe: yup.boolean(),
});

export const forgotPasswordSchema = yup.object().shape({
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      "CNIC must follow the format xxxxx-xxxxxxx-x",
    ),
});

export const editProfileSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Fullname is required")
    .max(30, "Full Name cannot exceed 30 characters")
    .matches(/^[a-zA-Z\s.]*$/, "Full Name can only contain letters"),
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      "CNIC must follow the format xxxxx-xxxxxxx-x",
    ),

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

  address: yup
    .string()
    .required("Address is required")
    .max(100, "Address cannot exceed 100 characters"),
  city: yup.string().required("City is required"),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6)
    .max(30, "Password must not exceed 30 characters")
    .test(
      "different-from-current",
      "New password must be different from current password",
      function (value) {
        const { currentPassword } = this.parent;
        return value !== currentPassword;
      },
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required(),
});

export const resetPasswordSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be exactly 6 digits"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must not exceed 30 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .max(30, "Password must not exceed 30 characters"),
});
