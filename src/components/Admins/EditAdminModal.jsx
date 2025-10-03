import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { TextField } from "@/components/reuseable/TextField";
import SelectField from "@/components/reuseable/SelectField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { adminUpdateSchema } from "@/schema/adminSchema";
import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";
import {
  updateAdminAsync,
  selectAdminsLoading,
} from "@/stores/slices/adminSlice";
import { fetchRolesAsync, selectRoles } from "@/stores/slices/roleSlice";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";

import ModalWrapper from "../reuseable/ModalWrapper";

const EditAdminModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.EDIT_ADMIN));
  const admin = useSelector(selectModalData);
  const isUpdating = useSelector((state) => selectAdminsLoading(state).update);
  const roles = useSelector(selectRoles);
  const cities = useSelector(selectCities);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminUpdateSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      cnic: "",
      gender: "",
      roleId: "",
      cityId: "",
      address: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchRolesAsync());
      dispatch(fetchCitiesAsync());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (admin && isOpen) {
      reset({
        fullName: admin.fullName || "",
        email: admin.email || "",
        phoneNumber: admin.phoneNumber || "",
        cnic: admin.cnic || "",
        gender: admin.gender || "",
        roleId: admin.role?.id || "",
        cityId: admin.city?.id || "",
        address: admin.address || "",
      });
    }
  }, [admin, reset, isOpen]);

  const handleUpdate = (data) => {
    const id = admin?.id;
    dispatch(updateAdminAsync({ id, data }))
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

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <ModalWrapper isOpen={isOpen} title="Edit Admin">
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Phone Number"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
            placeholder="Enter phone number"
            required
          />

          <TextField
            label="CNIC"
            {...register("cnic")}
            error={errors.cnic?.message}
            placeholder="12345-1234567-1"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Gender"
            {...register("gender")}
            error={errors.gender?.message}
            options={genderOptions}
            placeholder="Select gender"
            required
          />

          <SelectField
            label="Role"
            {...register("roleId")}
            error={errors.roleId?.message}
            options={roles || []}
            placeholder="Select role"
            required
          />
        </div>

        <SelectField
          label="City"
          {...register("cityId")}
          error={errors.cityId?.message}
          options={cities || []}
          placeholder="Select city"
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

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" loading={isUpdating} loadingLabel="Updating Admin...">
            Update Admin
          </Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};

export default EditAdminModal;
