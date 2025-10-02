import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { roleSchema } from "@/schema/roleSchema";
import { closeModal, MODAL_TYPES, selectIsModalOpenByType } from "@/stores/slices/modalSlice";
import { createRoleAsync, selectRolesLoading } from "@/stores/slices/roleSlice";
import ModalWrapper from "../reuseable/ModalWrapper";
import { sanitizeToLowerUnderscoreOnlyLetters } from "@/utils/inputSanitizers";

const AddRoleModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.ADD_ROLE));
  const isCreating = useSelector((state) => selectRolesLoading(state).create);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roleSchema),
    defaultValues: {
      key: "",
      value: "",
      description: "",
    },
  });

  const handleAdd = (data) => {
    dispatch(createRoleAsync(data))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Role created successfully");
        dispatch(closeModal());
        reset();
      })
      .catch((error) => {
        toast.error(error || "Failed to create role");
      });
  };

  return (
    <ModalWrapper isOpen={isOpen} title="Add New Role">
      <form onSubmit={handleSubmit(handleAdd)} className="space-y-4">
        <TextField
          label="Key"
          {...register("key")}
          onInput={sanitizeToLowerUnderscoreOnlyLetters}
          error={errors.key?.message}
          placeholder="Enter role key (e.g., admin, manager)"
          labelDescription="⚠️ Only lowercase letters and underscores are allowed. No numbers or special characters."
          required
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
          placeholder="Enter role description"
          required
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" loading={isCreating} loadingLabel="Creating Role...">
            Add Role
          </Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};

export default AddRoleModal;
