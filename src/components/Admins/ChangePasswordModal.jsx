import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { changePasswordSchemaForAdmin } from "@/schema/adminSchema";
import {
  changePasswordAsync,
  selectAdminsLoading,
} from "@/stores/slices/adminSlice";
import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";

import ModalWrapper from "../reuseable/ModalWrapper";

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.CHANGE_ADMIN_PASSWORD));
  const admin = useSelector(selectModalData);
  const isChanging = useSelector((state) => selectAdminsLoading(state).changePassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchemaForAdmin),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = (data) => {
    dispatch(changePasswordAsync({ data: { adminId: admin?.id, password: data?.newPassword } }))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Password changed successfully");
        dispatch(closeModal());
        reset();
      })
      .catch((error) => {
        toast.error(error || "Failed to change password");
      });
  };

  return (
    <ModalWrapper isOpen={isOpen} title={`Change Password - ${admin?.fullName || "Admin"}`}>
      <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> You are changing the password for <strong>{admin?.fullName}</strong> ({admin?.email}).
          </p>
        </div>

        <TextField
          label="New Password"
          type="password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
          placeholder="Enter new password"
          required
        />

        <TextField
          label="Confirm New Password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder="Confirm new password"
          required
        />

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Password Requirements:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>At least 8 characters long</li>
              <li>Contains at least one uppercase letter</li>
              <li>Contains at least one lowercase letter</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character (@$!%*?&)</li>
            </ul>
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" loading={isChanging} loadingLabel="Changing Password...">
            Change Password
          </Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};

export default ChangePasswordModal;
