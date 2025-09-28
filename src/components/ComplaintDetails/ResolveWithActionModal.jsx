import FileUploaderWithPreview from "@/components/reuseable/FileUploaderWithPreview";
import ModalWrapper from "@/components/reuseable/ModalWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { COMPLAINT_STATUS, HTTP_METHODS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { resolvedWithActionSchema } from "@/schema/complaintSchema";
import { fetchDashboardData } from "@/stores/slices/dashboardSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";



const ResolvedWithActionComplaintModel = ({ isOpen, onClose, complaint, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(resolvedWithActionSchema),
    defaultValues: {
      remarks: "",
      attachments: [],
    },
    mode: "onChange",
  });

  const attachments = watch("attachments");

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitForm = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("complaintId", complaint?.id);
    formData.append("remarks", data.remarks);
    formData.append("status", COMPLAINT_STATUS.RESOLVED_WITH_ACTION);

    if (attachments.length > 0) {
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    const response = await apiHandler(COMPLAINT_APIS.CHANGE_STATUS, {
      method: HTTP_METHODS.POST,
      data: formData,
    });
    setIsSubmitting(false);
    if (!response.success) {
      return toast.error(response?.message);
    }

    toast.success(response?.message);
    dispatch(fetchDashboardData(true))
    onSubmit?.();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Mark as Resolved With Action">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Remarks Input */}
        <Controller
          name="remarks"
          control={control}
          render={({ field }) => (
            <div className="space-y-1">
              <Textarea placeholder="Write your remarks here..." {...field} />
              {errors.remarks && (
                <span className="text-sm text-red-500">{errors.remarks.message}</span>
              )}
            </div>
          )}
        />

        <Separator />

        {/* File Upload */}
        <Controller
          name="attachments"
          control={control}
          render={({ field }) => (
            <div className="space-y-1">
              <FileUploaderWithPreview
                files={field.value}
                setFiles={(files) => field.onChange(files)}
              />
              {errors.attachments && (
                <span className="text-sm text-red-500">{errors.attachments.message}</span>
              )}
            </div>
          )}
        />

        <Controller
          name="confirmation"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="rounded-lg border p-4 flex items-start space-x-3 border-red-200 bg-red-300/20 dark:border-amber-800 dark:bg-amber-950/20">
              <input
                type="checkbox"
                id="confirmation"
                {...field}
                checked={field.value}
                className="mt-1 h-5 w-5 accent-red-500 cursor-pointer"
              />
              <label htmlFor="confirmation" className="text-sm leading-tight text-red-400 dark:text-amber-200">
                <span className="font-semibold">I confirm</span> that all the information provided is accurate
                and complete.
              </label>
            </div>
          )}
        />
        {errors.confirmation && (
          <span className="text-sm text-red-500">{errors.confirmation.message}</span>
        )}

        <div className="flex justify-end pt-4">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" className="ml-2" disabled={!isValid} loading={isSubmitting} >
            Send
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ResolvedWithActionComplaintModel;
