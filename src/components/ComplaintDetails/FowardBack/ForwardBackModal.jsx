"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import ModalWrapper from "@/components/reuseable/ModalWrapper"
import { Button } from "@/components/ui/button"
import { FileUploadArea } from "@/components/ui/file-upload"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { EnhancedStepper } from "@/components/ui/stepper"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Send } from "lucide-react"
import { ForwardBackReviewStep } from "./ForwardBackReviewStep"
import { apiHandler } from "@/lib/apiWrapper"
import { COMPLAINT_APIS } from "@/constants/APIs"
import { HTTP_METHODS } from "@/constants"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { fetchDashboardData } from "@/stores/slices/dashboardSlice"

const steps = ["Remarks & Attachments", "Review & Submit"]

// ✅ Validation Schema
const forwardBackSchema = z.object({
  remarks: z.string().min(10, "Remarks must be at least 10 characters"),
  attachment: z.array(z.any()).optional(),
  confirm: z.boolean().refine((val) => val === true, {
    message: "You must confirm before submitting.",
  }),
})

export const ForwardBackModal = ({ isOpen, onClose, user, forwardDetails, handleRefetch, complaint }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch=useDispatch()

  const form = useForm({
    resolver: zodResolver(forwardBackSchema),
    defaultValues: {
      remarks: "",
      attachment: [],
      confirm: false,
    },
    mode: "all"
  })

  const handleNext = async () => {
    const valid = await form.trigger(["remarks", "attachment"])
    if (valid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    const formData = new FormData();
    formData.append("remarks", data.remarks);
    formData.append("complaintId", complaint?.id);

    // Append each attachment if it's a File
    if (Array.isArray(data.attachment)) {
      data.attachment.forEach((file) => {
        if (file instanceof File) {
          formData.append("attachments", file);
        }
      });
    }

    const response = await apiHandler(COMPLAINT_APIS.FORWARD_BACK, {
      method: HTTP_METHODS.POST,
      data: formData,
    });
    setIsSubmitting(false)
    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    dispatch(fetchDashboardData(true))
    onClose();
    handleRefetch?.();
    form.reset();
    setCurrentStep(0);
  };


  const handleClose = () => {
    onClose()
    form.reset()
    setCurrentStep(0)
  }

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-2">

          {/* Sender Block (replace with actual data) */}
          <h3 className="text-lg font-semibold">Submit Back To</h3>
          <div className="flex items-start gap-4 bg-muted/40 rounded-md p-4 border-green-200 border">
            <img
              src={
                forwardDetails?.lastHistory?.forwardedBy?.assignedPerson?.profileImage ??
                "/placeholder-avatar.png"
              }
              alt="Sender"
              className="w-12 h-12 rounded-full object-cover border"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/profile.jpg";
              }}
            />
            <div>
              <div className="text-sm font-medium text-foreground">
                {forwardDetails?.lastHistory?.forwardedBy?.assignedPerson?.fullName || "N/A"}
              </div>
              <div className="text-xs text-muted-foreground">
                {forwardDetails?.lastHistory?.forwardedBy?.assignedPerson?.role?.value || "N/A"}
              </div>
              {forwardDetails?.lastHistory?.location && <div className="text-xs text-muted-foreground mt-1">
                <strong>Location:</strong>{" "}
                {forwardDetails?.lastHistory?.location || "N/A"}
              </div>}
            </div>
          </div>


          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide your remarks for forwarding back..."
                    className="min-h-[120px] resize-none"
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
                <FormLabel className="text-base font-semibold">Attachments</FormLabel>
                <FormControl>
                  <FileUploadArea field={field} error={form.formState.errors.attachment?.message} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )
    }

    return (
      <ForwardBackReviewStep
        form={form}
        user={user}
        lastHistory={forwardDetails?.lastHistory}
      />
    )
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Submit Back Complaint" titleClassName="px-4" className="sm:max-w-2xl px-0 w-full">
      <div className="space-y-6 max-h-[85vh] overflow-auto px-4">
        <EnhancedStepper currentStep={currentStep} isForwardBack={true} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="min-h-[400px] px-1">{renderStepContent()}</div>

            <Separator />

            <div className="flex justify-between bg-background sticky bottom-0 items-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext} className="flex items-center gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !form.watch("confirm")}
                  loading={isSubmitting}
                  className="flex items-center gap-2 min-w-[140px]"
                >
                  <Send className="h-4 w-4" />
                  Submit Back
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </ModalWrapper>
  )
}

export default ForwardBackModal
