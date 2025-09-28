import ComboboxField from "@/components/reuseable/ComboboxField";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { formatCharacterOnlyInput, formatPhoneNumberInput } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";

// Separate schema for the alleged person form
const allegedPersonSchema = yup.object().shape({
  name: yup.string().optional(),
  designation: yup.string().optional(),
  departmentId: yup.string().required("Department is required"),
  phoneNumber: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^(\d{4})-(\d{7})$/, "Format: 0300-0000000")
    .transform((value) => (value === "" ? null : value)),
  address: yup.string().optional(),
  additionalInfo: yup.string().optional(),
  otherDepartment: yup.string().optional().nullable(),
});

export const AllegedPersonFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  departments,
  departmentsLoading,
}) => {
  const methods = useForm({
    resolver: yupResolver(allegedPersonSchema),
    defaultValues: initialData || {
      name: "",
      designation: "",
      departmentId: "",
      phoneNumber: "",
      address: "",
      additionalInfo: "",
      otherDepartment: ""
    }
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = methods

  // Reset form when open/initialData changes
  useEffect(() => {
    reset(initialData || {
      name: "",
      designation: "",
      departmentId: "",
      phoneNumber: "",
      address: "",
      additionalInfo: "",
      otherDepartment: ""
    });
  }, [open, initialData, reset]); // Add open to dependency array

  // 🔍 Watch the selected departmentId from the form
  const selectedDepartmentId = useWatch({
    control: control,
    name: "departmentId",
  });

  // 🎯 Find the selected department object from the departments list
  const selectedDepartment = departments?.find(
    (department) => department?.id === selectedDepartmentId
  );

  const isOtherDepartment = selectedDepartment?.key === "other";



  return (
    <Dialog open={open} onOpenChange={(value) => { onOpenChange(value); }}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Alleged Person" : "Add Alleged Person"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the alleged person details"
              : "Add a new alleged person to the list"}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <TextField
                label="Name"
                {...register("name",{
                  onChange: (e) => {
                      const formatted = formatCharacterOnlyInput(e.target.value);
                      setValue("name", formatted, { shouldValidate: true });
                  },
              })}
                error={errors.name?.message}
              />
              <TextField
                label="Designation"
                {...register("designation",{
                  onChange: (e) => {
                    const formatted = formatCharacterOnlyInput(e.target.value);
                    setValue("designation", formatted, { shouldValidate: true });
                },
                })}
                error={errors.designation?.message}
              />

              <ComboboxField
                name="departmentId"
                label="Department *"
                placeholder="Select department"
                options={departments}
                valueKey="id"
                labelKey="value"
                isLoading={departmentsLoading}
                error={errors.departmentId?.message}
              />

              {/* ✅ Conditionally show input if department is "Other" */}
              {isOtherDepartment && (
                <TextField
                  label="Other Department *"
                  placeholder="Specify the department..."
                  {...register("otherDepartment")}
                  error={errors.otherDepartment?.message}
                  required
                />
              )}
              <div className="mt-2">
                <TextField
                  label="Phone Number"
                  {...register("phoneNumber", {
                    onChange: (e) => {
                      const formatted = formatPhoneNumberInput(e.target.value);
                      setValue("phoneNumber", formatted, { shouldValidate: true });

                    }
                  })}
                  error={errors.phoneNumber?.message}
                />
              </div>
              <div className="sm:col-span-2">
                <TextField
                  label="Address"
                  {...register("address")}
                  error={errors.address?.message}
                />
              </div>
              <div className="sm:col-span-2">
                <TextField
                  label="Additional Info"
                  textarea
                  {...register("additionalInfo")}
                  error={errors.additionalInfo?.message}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                variant="black"
                type="submit"
              >
                {initialData ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
