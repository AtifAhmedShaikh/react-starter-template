import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import {
  DialogFooter
} from "@/components/ui/dialog";
import { permissionSchema } from "@/schema/permissionSchema";
import { closeModal, MODAL_TYPES, selectIsModalOpenByType } from "@/stores/slices/modalSlice";
import { createPermissionAsync } from "@/stores/slices/permissionSlice";
import { sanitizeToLowerUnderscoreOnlyLetters } from "@/utils/inputSanitizers";
import ModalWrapper from "../reuseable/ModalWrapper";

const AddPermissionModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.ADD_PERMISSION));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(permissionSchema),
  });

  const handleAdd = async (data) => {
    try {
      await dispatch(createPermissionAsync(data)).unwrap();
      toast.success("Permission created successfully");
      dispatch(closeModal());
      reset();
    } catch (error) {
      toast.error(error || "Failed to create permission");
    }
  };


  return (
    <ModalWrapper isOpen={isOpen} title="Add New Permission" >
      <form onSubmit={handleSubmit(handleAdd)} className="space-y-4">
        <TextField
          label="Key"
          {...register("key")}
          error={errors.key?.message}
          placeholder="Enter permission key (e.g., user:create)"
          labelDescription="⚠️ Only lowercase letters and underscores are allowed. No numbers or special characters."
          onInput={sanitizeToLowerUnderscoreOnlyLetters}
          required
        />
        <TextField
          label="Value"
          {...register("value")}
          error={errors.value?.message}
          placeholder="Enter permission description (e.g., Create User)"
          required
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={()=>dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Add Permission</Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};

export default AddPermissionModal;
