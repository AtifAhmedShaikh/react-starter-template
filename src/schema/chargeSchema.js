import * as yup from "yup";

export const step1Schema = yup.object({
  role: yup.string().required("Please select a role"),
  location: yup.string().required("Please select the location"),
  currentCharge: yup.string().nullable().optional(),
  charges: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        chargeName: yup.string().required(),
      }),
    )
    .min(1, "At least one charge is required")
    .required("Charges are required"),
});

export const step2Schema = yup.object({
  status: yup.string().optional().nullable(),

  remarks: yup
    .string()
    .min(10, "Remarks must be at least 10 characters")
    .required("Remarks is required"),

  attachment: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          "fileType",
          "Only images or PDFs are allowed",
          (file) =>
            file
              ? [
                  "application/pdf",
                  "image/jpeg",
                  "image/png",
                  "image/gif",
                ].includes(file.type)
              : true, // ✅ allow if no file
        )
        .test(
          "fileSize",
          "File size must be less than 10MB",
          (file) => (file ? file.size <= 10 * 1024 * 1024 : true), // ✅ allow if no file
        ),
    )
    .nullable(), // ✅ makes it optional
});

export const step3Schema = yup.object({
  confirm: yup.boolean().oneOf([true], "You must confirm before submitting."),
});

export const completeSchema = step1Schema
  .concat(step2Schema)
  .concat(step3Schema);
