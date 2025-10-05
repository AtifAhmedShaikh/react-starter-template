import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import SelectField from "@/components/reuseable/SelectField";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { adminUpdateSchema } from "@/schema/adminSchema";
import {
  selectAdminsLoading,
  updateAdminAsync,
} from "@/stores/slices/adminSlice";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";
import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";

import ModalWrapper from "../reuseable/ModalWrapper";
import SearchableSelectField from "../reuseable/SearchableSelectField";
import { deFormatCnic, deFormatMobileNumber, formatCnic, formatCNICInput, formatMobileNumber, formatPhoneNumberInput } from "@/utils/formatters";

const EditAdminModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.EDIT_ADMIN));
  const admin = useSelector(selectModalData);
  const isUpdating = useSelector((state) => selectAdminsLoading(state).update);
  const cities = useSelector(selectCities);

  const methods = useForm({
    resolver: yupResolver(adminUpdateSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      cnic: "",
      gender: "",
      cityId: "",
      address: "",
    },
  });

  const {
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCitiesAsync());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (admin && isOpen) {
      reset({
        fullName: admin.fullName || "",
        email: admin.email || "",
        phoneNumber: formatMobileNumber(admin.phoneNumber) || "",
        cnic: formatCnic(admin.cnic) || "",
        gender: admin.gender || "",
        cityId: admin.city?.id || "",
        address: admin.address || "",
      });
    }
  }, [admin, reset, isOpen]);

  const handleUpdate = (data) => {
    const id = admin?.id;
    dispatch(updateAdminAsync({ data: { ...data, adminId: id } }))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Admin updated successfully");
        dispatch(closeModal());
        reset();
      })
      .catch((error) => {
        toast.error(error || "Failed to update admin");
      });
  };

  return (
    <ModalWrapper isOpen={isOpen} title="Edit Admin">
      <FormProvider {...methods} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Full Name"
            {...register("fullName")}
            error={errors.fullName?.message}
            placeholder="Enter full name"
            required
          />

          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Enter email address"
            required
          />

          <TextField
            label="Phone Number"
            {...register("phoneNumber", {
              onChange: (e) => {
                setValue("phoneNumber", formatPhoneNumberInput(e.target.value), { shouldValidate: true });
              },
            })}
            error={errors.phoneNumber?.message}
            placeholder="Enter phone number"
            required
          />

          <TextField
            label="CNIC"
            {...register("cnic", {
              onChange: (e) => {
                setValue("cnic", formatCNICInput(e.target.value), { shouldValidate: true });
              },
            })}
            error={errors.cnic?.message}
            placeholder="12345-1234567-1"
            required
          />

          <SelectField
            label="Gender"
            {...register("gender")}
            error={errors.gender?.message}
            options={[
              { value: "male", id: "MALE" },
              { value: "female", id: "FEMALE" },
            ]}
            placeholder="Select gender"
            required
          />
          <SearchableSelectField
            label="City"
            name="cityId"
            error={errors.cityId?.message}
            options={cities?.data || []}
            placeholder="Select city"
            labelKey="value"
            valueKey="id"
            isLoading={cities?.loading}
            required
          />
          <TextField
            label="Address"
            {...register("address")}
            error={errors.address?.message}
            placeholder="Enter complete address"
            required
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" onClick={methods.handleSubmit(handleUpdate)} loading={isUpdating} loadingLabel="Updating Admin...">
            Update Admin
          </Button>
        </DialogFooter>
      </FormProvider>
    </ModalWrapper>
  );
};

export default EditAdminModal;
