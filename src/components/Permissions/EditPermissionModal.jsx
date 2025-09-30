import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import {
  DialogFooter
} from "@/components/ui/dialog";

import { permissionUpdateSchema } from "@/schema/permissionSchema";
import { closeModal, MODAL_TYPES, selectIsModalOpenByType, selectModalData } from "@/stores/slices/modalSlice";
import { updatePermissionAsync } from "@/stores/slices/permissionSlice";
import { useSelector } from "react-redux";
import ModalWrapper from "../reuseable/ModalWrapper";

const EditPermissionModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.EDIT_PERMISSION));
  const permission = useSelector(selectModalData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(permissionUpdateSchema),
  });

  useEffect(() => {
    if (permission && isOpen) {
      reset(permission);
    }
  }, [permission, reset, isOpen]);

  const handleUpdate = async (data) => {
    delete data.id;
    try {
      await dispatch(
        updatePermissionAsync({ id: permission?.id, data })
      ).unwrap();
      toast.success("Permission updated successfully");
      reset();
      dispatch(closeModal());
    } catch (error) {
      toast.error(error || "Failed to update permission");
    }
  };


  return (
    <ModalWrapper isOpen={isOpen} title="Edit Permission" >
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
        <TextField
          label="Key"
          {...register("key")}
          error={errors.key?.message}
          placeholder="Enter permission key (e.g., user:create)"
          labelDescription="⚠️ Only lowercase letters and underscores are allowed. No numbers or special characters."
          disabled
        />
        <TextField
          label="Value"
          {...register("value")}
          error={errors.value?.message}
          placeholder="Enter permission description (e.g., Create User)"
          required
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Update Permission</Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};

export default EditPermissionModal;
