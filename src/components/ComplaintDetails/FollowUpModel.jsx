import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ModalWrapper from "@/components/reuseable/ModalWrapper";
import FileUploaderWithPreview from "@/components/reuseable/FileUploaderWithPreview";
import { apiHandler } from "@/lib/apiWrapper";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { HTTP_METHODS } from "@/constants";
import { toast } from "sonner";

const FollowUpModal = ({ isOpen, complaintId, handleRefetch }) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      message: "",
      attachments: [],
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const attachments = watch("attachments");

  const handleClose = () => {
    reset();
    handleRefetch?.();
  };

  const submitForm = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("complaintId", complaintId);
      formData.append("message", data.message);

      if (attachments.length > 0) {
        attachments.forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const response = await apiHandler(COMPLAINT_APIS.CREATE_FOLLOW_UP, {
        method: HTTP_METHODS.POST,
        data: formData,
      });

      if (!response.success) {
        return toast.error(response.message);
      }

      toast.success("Follow-up message sent successfully");
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to send follow-up message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Send Follow-Up Message">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Message Input */}
        <Controller
          name="message"
          control={control}
          rules={{ required: "Message is required" }}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Textarea placeholder="Write your follow-up message" {...field} />
              {fieldState.error && (
                <span className="text-sm text-red-500">{fieldState.error.message}</span>
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
            <FileUploaderWithPreview
              files={field.value}
              setFiles={(files) => field.onChange(files)}
            />
          )}
        />

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="ml-2" disabled={!isValid || loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default FollowUpModal;
