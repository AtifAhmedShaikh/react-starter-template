import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import SelectField from "@/components/reuseable/SelectField";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { adminSchema } from "@/schema/adminSchema";
import { createAdminAsync, selectAdminsLoading } from "@/stores/slices/adminSlice";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";
import { closeModal, MODAL_TYPES, selectIsModalOpenByType } from "@/stores/slices/modalSlice";
import { fetchRolesAsync, selectRoles, selectRolesLoading } from "@/stores/slices/roleSlice";
import { formatCNICInput, formatPhoneNumberInput } from "@/utils/formatters";
import ModalWrapper from "../reuseable/ModalWrapper";
import SearchableSelectField from "../reuseable/SearchableSelectField";

const AddAdminModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.ADD_ADMIN));
  const isCreating = useSelector((state) => selectAdminsLoading(state).create);
  const roles = useSelector(selectRoles);
  const rolesLoading = useSelector(selectRolesLoading);
  const cities = useSelector(selectCities);

  const methods = useForm({
    resolver: yupResolver(adminSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      cnic: "",
      gender: "",
      roleId: "",
      cityId: "",
      address: "",
      password: "",
      confirmPassword: "",
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
      dispatch(fetchRolesAsync());
      dispatch(fetchCitiesAsync());
    }
  }, [isOpen, dispatch]);

  const handleAdd = (data) => {
    // Remove confirmPassword before sending
    const { confirmPassword, ...adminData } = data;

    dispatch(createAdminAsync(adminData))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Admin created successfully");
        dispatch(closeModal());
        reset();
      })
      .catch((error) => {
        toast.error(error || "Failed to create admin");
      });
  };
  console.log(errors);
  return (
    <ModalWrapper isOpen={isOpen} title="Add New Admin">
      <FormProvider {...methods} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            label="Full Name"
            {...register("fullName")}
            error={errors.fullName?.message}
            placeholder="Enter full name"
            required
            wrapperClass="col-span-2"
          />

          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Enter email address"
            required
            wrapperClass="col-span-2"
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
            wrapperClass="col-span-2"
          />

          <SearchableSelectField
            label="Role"
            name="roleId"
            error={errors.roleId?.message}
            options={roles}
            placeholder="Select role"
            labelKey="value"
            valueKey="id"
            isLoading={rolesLoading?.fetch}
            required
          />

          <SearchableSelectField
            label="City"
            name="cityId"
            error={errors.cityId?.message}
            options={cities?.data || []}
            placeholder="Select city"
            isLoading={cities?.loading}
            labelKey="value"
            valueKey="id"
            required
          />

          <TextField
            label="Address"
            {...register("address")}
            error={errors.address?.message}
            placeholder="Enter complete address"
            required
            wrapperClass="col-span-2"
          />

          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Enter password"
            required
          />

          <TextField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="Confirm password"
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" onClick={methods.handleSubmit(handleAdd)} loading={isCreating} loadingLabel="Creating Admin...">
            Add Admin
          </Button>
        </DialogFooter>
      </FormProvider>
    </ModalWrapper>
  );
};

export default AddAdminModal;
