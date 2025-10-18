import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/utils/toastUtils";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { changeRoleSchema } from "@/schema/adminSchema";
import {
  changeRoleAsync,
  selectAdminsLoading,
} from "@/stores/slices/adminSlice";
import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";
import {
  fetchRolesAsync,
  selectRoles,
  selectRolesLoading,
} from "@/stores/slices/roleSlice";

import ModalWrapper from "../reuseable/ModalWrapper";
import SearchableSelectField from "../reuseable/SearchableSelectField";

const ChangeRoleModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.CHANGE_ADMIN_ROLE));
  const admin = useSelector(selectModalData);
  const isChanging = useSelector((state) => selectAdminsLoading(state).changeRole);
  const roles = useSelector(selectRoles);
  const rolesLoading = useSelector(selectRolesLoading);

  const methods = useForm({
    resolver: yupResolver(changeRoleSchema),
    defaultValues: {
      roleId: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchRolesAsync());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (admin && isOpen) {
      reset({
        roleId: admin.role?.id || "",
      });
    }
  }, [admin, reset, isOpen]);

  const handleChangeRole = (data) => {
    dispatch(changeRoleAsync({ data: { adminId: admin?.id, roleId: data?.roleId } }))
      .unwrap()
      .then((response) => {
        showToast.success(response.message || "Role changed successfully");
        dispatch(closeModal());
        reset();
      })
      .catch((error) => {
        showToast.error(error || "Failed to change role");
      });
  };

  return (
    <ModalWrapper isOpen={isOpen} title={`Change Role - ${admin?.fullName || "Admin"}`}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleChangeRole)} className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm text-primary">
              <strong>Current Role:</strong> {admin?.role?.value || "No role assigned"}
            </p>
            <p className="text-sm text-primary mt-1">
              <strong>Admin:</strong> {admin?.fullName} ({admin?.email})
            </p>
          </div>

          <SearchableSelectField
            name={"roleId"}
            label="New Role"
            error={errors.roleId?.message}
            options={roles}
            labelKey="value"
            valueKey="id"
            isLoading={rolesLoading?.fetch}
            placeholder="Select new role"
            required
          />

          <div className="bg-yellow-500/10 p-4 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Warning:</strong> Changing the admin's role will affect their permissions and access to different parts of the system. Please ensure this change is intentional.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isChanging}
              loadingLabel="Changing Role..."
            >
              Change Role
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
};

export default ChangeRoleModal;
