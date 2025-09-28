import * as yup from "yup";

export const complaintSchema = yup.object().shape({
  // 👤 User Info (from defaultValues, not shown but assumed from context)
  fullName: yup.string().required("Full name is required"),
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(/^[0-9]{13}$/, "CNIC must be 13 digits"),
  email: yup.string().email("Invalid email").optional("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^03[0-9]{9}$/, "Phone must be a valid 11-digit Pakistani number"),
  address: yup.string().required("Address is required"),
  cityId: yup.string().required("City is required"),

  // 📋 Complaint Details
  offenceId: yup.string().required("Offence is required"),
  typeOfPersonId: yup.string().required("Type of person is required"),
  zoneId: yup.string().required("division is required"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(2000, "Subject must be at most 2000 characters"),
  summary: yup
    .string()
    .required("Summary is required")
    .min(10, "Summary must be at least 10 characters")
    .max(5000, "Summary must be at most 5000 characters"),

  witnessName: yup
    .string()
    .nullable()
    .max(100, "Witness name must be at most 100 characters"),
  witnessCnic: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{5}-\d{7}-\d{1}$/, "Format: xxxxx-xxxxxxx-x")
    .transform((value) => (value === "" ? null : value)),

  // 👨‍⚖️ Alleged Persons (array of objects)

  allegedPersons: yup.array().of(
    yup.object().shape({
      name: yup.string().optional("Name is required"),
      designation: yup.string().optional("Designation is required"),
      departmentId: yup.string().required("Department is required"),
      phoneNumber: yup
        .string()
        .nullable()
        .notRequired()
        .matches(/^(\d{4})-(\d{7})$/, "Format: 0300-0000000")
        .transform((value) => (value === "" ? null : value)),
      address: yup.string().optional("Address is required"),
      additionalInfo: yup.string().optional(),
    }),
  ),
  truthConfirmation: yup
    .boolean()
    .oneOf([true], "You must confirm the information is truthful"),
  otherOffence: yup.string().optional().nullable(),
  otherTypeOfPerson: yup.string().optional().nullable(),
});

export const tempAllegedPerson = yup.object().shape({
  name: yup.string().optional("Name is required"),
  designation: yup.string().optional("Designation is required"),
  departmentId: yup.string().required("Department is required"),
  phoneNumber: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^(\d{4})-(\d{7})$/, "Format: 0300-0000000")
    .transform((value) => (value === "" ? null : value)),
  address: yup.string().optional("Address is required"),
  additionalInfo: yup.string().optional(),
  otherDepartment: yup.string().optional().nullable(),
});

export const fileDisposeSchema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .min(10, "Remarks must be at least 10 characters"),
  attachments: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "Only images or PDFs allowed", (file) =>
          file
            ? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "application/pdf",
              ].includes(file.type)
            : true,
        )
        .test("fileSize", "File size must be less than 5MB", (file) =>
          file ? file.size <= 5 * 1024 * 1024 : true,
        ),
    )
    .max(5, "You can upload up to 5 files"),
  confirmation: yup
    .boolean()
    .oneOf([true], "You must confirm before submitting"),
});

// schema for dispose, irrelevant and refer (same schema for these)
export const irrelevantDisposeSchema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .min(10, "Remarks must be at least 10 characters"),
  attachments: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "Only images or PDFs allowed", (file) =>
          file
            ? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "application/pdf",
              ].includes(file.type)
            : true,
        )
        .test("fileSize", "File size must be less than 5MB", (file) =>
          file ? file.size <= 5 * 1024 * 1024 : true,
        ),
    )
    .max(5, "You can upload up to 5 files"),

  confirmation: yup
    .boolean()
    .oneOf([true], "You must confirm before submitting"),
});

export const resolvedWithoutActionSchema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .min(10, "Remarks must be at least 10 characters"),
  attachments: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "Only images or PDFs allowed", (file) =>
          file
            ? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "application/pdf",
              ].includes(file.type)
            : true,
        )
        .test("fileSize", "File size must be less than 5MB", (file) =>
          file ? file.size <= 5 * 1024 * 1024 : true,
        ),
    )
    .max(5, "You can upload up to 5 files"),
  confirmation: yup
    .boolean()
    .oneOf([true], "You must confirm before submitting"),
});

export const resolvedWithActionSchema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .min(10, "Remarks must be at least 10 characters"),
  attachments: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "Only images or PDFs allowed", (file) =>
          file
            ? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "application/pdf",
              ].includes(file.type)
            : true,
        )
        .test("fileSize", "File size must be less than 5MB", (file) =>
          file ? file.size <= 5 * 1024 * 1024 : true,
        ),
    )
    .max(5, "You can upload up to 5 files"),
  confirmation: yup
    .boolean()
    .oneOf([true], "You must confirm before submitting"),
});

export const openComplaintSchema = yup.object().shape({
  // 👤 User Info (from defaultValues, not shown but assumed from context)
  fullName: yup.string().required("Full name is required"),
  fatherName: yup.string().required("Full name is required"),
  country: yup.string().required("Country is required"),
  gender: yup.string().required("Gender is required"),
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, "Format: xxxxx-xxxxxxx-x"),
  email: yup.string().email("Invalid email").optional("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^(\d{4})-(\d{7})$/, "Format: 0300-0000000"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(2000, "Address must be at most 2000 characters"),
  cityId: yup.string().required("City is required"),

  // 📋 Complaint Details
  offenceId: yup.string().required("Offence is required"),
  otherOffence: yup.string().optional().nullable(),
  typeOfPersonId: yup.string().required("Type of person is required"),
  zoneId: yup.string().required("division is required"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(2000, "Subject must be at most 2000 characters"),
  summary: yup
    .string()
    .required("Summary is required")
    .min(10, "Summary must be at least 10 characters")
    .max(5000, "Summary must be at most 5000 characters"),

  witnessName: yup
    .string()
    .nullable()
    .max(100, "Witness name must be at most 100 characters"),
  witnessCnic: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{5}-\d{7}-\d{1}$/, "Format: xxxxx-xxxxxxx-x")
    .transform((value) => (value === "" ? null : value)),

  // 👨‍⚖️ Alleged Persons (array of objects)
  allegedPersons: yup.array().of(
    yup.object().shape({
      name: yup.string().optional("Name is required"),
      designation: yup.string().optional("Designation is required"),
      departmentId: yup.string().required("Department is required"),
      phoneNumber: yup
        .string()
        .nullable()
        .notRequired()
        .matches(/^(\d{4})-(\d{7})$/, "Format: 0300-0000000")
        .transform((value) => (value === "" ? null : value)),
      address: yup.string().optional("Address is required"),
      additionalInfo: yup.string().optional(),
      otherDepartment: yup.string().optional().nullable(),
    }),
  ),
  truthConfirmation: yup
    .boolean()
    .oneOf([true], "You must confirm the information is truthful"),
  otherOffence: yup.string().optional().nullable(),
  otherTypeOfPerson: yup.string().optional().nullable(),
  otherDepartment: yup.string().optional().nullable(),
});

export const forwardToACCSchema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .min(10, "Remarks must be at least 10 characters"),
  attachments: yup.array().max(5, "You can upload up to 5 files"),
  selectedMember: yup
    .string()
    .required("Please select an ACC committee member"), // committees list for
  locationId: yup.string().when("memberLevel", {
    is: (val) => val === 1 || val === 2,
    then: (schema, val) =>
      schema.required(
        val === 1 ? "division is required" : "District is required",
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
  selectedCommittieeCharge: yup
    .string()
    .required("Please select a committee charge"),
});
