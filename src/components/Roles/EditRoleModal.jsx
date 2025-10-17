import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/utils/toastUtils";

import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { roleUpdateSchema } from "@/schema/roleSchema";
import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";
import {
  updateRoleAsync,
  selectRolesLoading,
} from "@/stores/slices/roleSlice";

import ModalWrapper from "../reuseable/ModalWrapper";

const EditRoleModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.EDIT_ROLE));
  const role = useSelector(selectModalData);
  const isUpdating = useSelector((state) => selectRolesLoading(state).update);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roleUpdateSchema),
    defaultValues: {
      key: "",
      value: "",
      description: "", // Add if you're using it in schema
    },
  });

  useEffect(() => {
    if (role && isOpen) {
      reset({
        key: role.key,
        value: role.value,
        description: role.description || "", // optional
      });
    }
  }, [role, reset, isOpen]);

  const handleUpdate = (data) => {
    const id = role?.id;
    delete data.id;
    dispatch(updateRoleAsync({ id, data }))
      .unwrap()
      .then((response) => {
        showToast.success(response.message || "Role updated successfully");
        dispatch(closeModal());
        reset();
      })
      .catch((error) => {
        showToast.error(error || "Failed to update role");
      });
  };

  return (
    <ModalWrapper isOpen={isOpen} title="Edit Role">
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
        <TextField
          label="Key"
          {...register("key")}
          error={errors.key?.message}
          placeholder="Role key (e.g., admin, manager)"
          disabled
        />

        <TextField
          label="Value"
          {...register("value")}
          error={errors.value?.message}
          placeholder="Enter role value (e.g., Admin, Manager)"
          required
        />

        <TextField
          label="Description"
          {...register("description")}
          error={errors.description?.message}
          placeholder="Describe the role (short description for the role)"
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" loading={isUpdating} loadingLabel="Updating Role...">
            Update Role
          </Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};

export default EditRoleModal;
