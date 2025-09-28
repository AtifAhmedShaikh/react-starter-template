import SelectField from "@/components/reuseable/SelectField";
import { FileUploadArea } from "@/components/ui/file-upload";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { COMPLAINT_STATUS } from "@/constants";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { useEffect } from "react";

export const StepTwo = ({ form, errors, statusArray, complaint }) => {
  const { hasPermission } = usePermissions()
  const canChangeStatus = hasPermission(PermissionKeys.can_forward_to_acc_committee)

  // prepare status dropdown options based on complaint status
  const filteredStatusArray = statusArray
    ?.filter(
      (status) =>
        status?.originalStatus === COMPLAINT_STATUS.FURTHER_VERIFICATION ||
        status?.originalStatus === COMPLAINT_STATUS.OPEN_INQUIRY
    )
    ?.map((status) => ({
      id: status.id,
      value: status.adminLabel,
      originalStatus: status.originalStatus,
    }));

  // // Automatically set default status to FURTHER_VERIFICATION if complaint.status === "SUBMITTED"
  // useEffect(() => {
  //   if (!canChangeStatus) {
  //     const currentStatus = complaint?.status?.id ?? null;
  //     if (form.getValues("status") !== currentStatus) {
  //       form.setValue("status", currentStatus);
  //     }
  //     return;
  //   }

  //   if (
  //     complaint?.status?.originalStatus === COMPLAINT_STATUS.INITIAL_APPLICATION &&
  //     filteredStatusArray?.length
  //   ) {
  //     const defaultStatus = filteredStatusArray.find(
  //       (s) => s.originalStatus === COMPLAINT_STATUS.FURTHER_VERIFICATION
  //     );

  //     if (defaultStatus && form.getValues("status") !== defaultStatus.id) {
  //       form.setValue("status", defaultStatus.id);
  //     }
  //   }
  // }, [complaint?.status, filteredStatusArray, canChangeStatus]);


  return (
    <div className="space-y-6">
      {canChangeStatus && complaint?.status?.originalStatus !== COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED && complaint?.status?.originalStatus !== COMPLAINT_STATUS.INITIAL_APPLICATION ? <SelectField
        name="status"
        label="Status (Optional)"
        options={filteredStatusArray}
        placeholder="Select status (optional)"
        error={errors?.status?.message}
      /> : ""}

      <FormField
        control={form.control}
        name="remarks"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Detailed Remarks</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide comprehensive details about the complaint, including specific incidents, dates, and any relevant context..."
                className="min-h-[120px] resize-none sm:text-sm text-xs"
                {...field}
              />
            </FormControl>
            <div className="flex justify-between text-xs text-muted-foreground">
              <FormMessage />
              <span>{field.value?.length || 0} characters</span>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="attachment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Attachments Documents</FormLabel>
            <FormControl>
              <FileUploadArea field={field} error={errors.attachment?.message} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
