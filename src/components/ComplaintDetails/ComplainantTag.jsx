import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { HABITUAL_COMPLAINANT_TAGS, HTTP_METHODS } from "@/constants";
import { apiHandler } from "@/lib/apiWrapper";
import { OtpPromptModal } from "@/components/reuseable/OTPPromptModal";
import { CheckCircle, XCircle, LoaderCircle, Bot, ChevronRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ComplainantTag = ({ complainantTag, complaintId, userId, onUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // If no complainantTag, don't render anything
  if (!complainantTag || !complainantTag.key || !complainantTag.value) {
    return null;
  }

  const { key = "", value = "" } = complainantTag;

  // Handle opening action modal
  const handleOpenActionModal = () => {
    setShowActionModal(true);
  };

  // Handle approve/reject actions
  const handleAction = (action) => {
    setPendingAction(action);
    setShowActionModal(false);
    setShowOtpModal(true);
  };

  const handleOtpConfirm = async (otp) => {
    if (!pendingAction || !complaintId || !userId) return;
    setIsSubmitting(true);
    const response = await apiHandler(COMPLAINT_APIS.UPDATE_COMPLAINANT_TAG_STATUS, {
      method: HTTP_METHODS.POST,
      data: {
        complaintId,
        userId: userId,
        status: pendingAction, // 'approve' or 'reject'
        otp
      }
    });
    setIsSubmitting(false);

    if (!response?.success) {
      toast.error(response?.message || 'Failed to update complainant tag status');
      return;
    }

    toast.success(`Complainant tag ${pendingAction}d successfully`);
    setShowOtpModal(false);
    setPendingAction(null);

    // Call the onUpdate callback to refresh data
    if (onUpdate) {
      onUpdate();
    }
  };

  // Get badge styling based on tag key
  const getBadgeStyling = (tagKey) => {
    switch (tagKey) {
      case HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT:
        return "bg-orange-100 text-orange-800 border-orange-200";
      case HABITUAL_COMPLAINANT_TAGS.HABITUAL_COMPLAINANT:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // Check if tag is actionable (can be approved/rejected)
  const isActionable = key === HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT || key === HABITUAL_COMPLAINANT_TAGS.HABITUAL_COMPLAINANT;

  return (
    <>
      <div 
        className={`flex items-center gap-3 p-4 rounded-lg border-2 border-dashed transition-all duration-700 animate-bounce ${
          isActionable 
            ? key === HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT
              ? 'border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-100 cursor-pointer'
              : 'border-red-300 bg-red-50 hover:border-red-400 hover:bg-red-100 cursor-pointer'
            : 'border-gray-200 bg-gray-50'
        }`}
        onClick={isActionable ? handleOpenActionModal : undefined}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">AI Identified:</span>
          </div>
          <Badge
            variant="outline"
            className={`${getBadgeStyling(key)} font-medium text-xs px-3 py-1`}
          >
            {value}
          </Badge>
        </div>

        {isActionable && (
          <div className="flex items-center gap-2 ml-auto">
            <span className={`text-xs font-medium ${
              key === HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT 
                ? 'text-orange-600' 
                : 'text-red-600'
            }`}>
              Click to take action
            </span>
            <ChevronRight className={`w-4 h-4 ${
              key === HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT 
                ? 'text-orange-600' 
                : 'text-red-600'
            }`} />
          </div>
        )}
      </div>

      {/* Action Modal */}
      <Dialog open={showActionModal} onOpenChange={setShowActionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              AI Identified Fake Complainant
            </DialogTitle>
            <DialogDescription className="text-left">
              The system has identified this complainant as <strong>{value}</strong> based on AI analysis. 
              Please review and take appropriate action.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">AI Analysis Result</span>
              </div>
              <Badge
                variant="outline"
                className={`${getBadgeStyling(key)} font-medium`}
              >
                {value}
              </Badge>
            </div>

            <div className="space-y-3">
              {/* Show Approve button only for SUSPECTED_HABITUAL_COMPLAINANT */}
              {key === HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT && (
                <Button
                  onClick={() => handleAction('APPROVE')}
                  disabled={isSubmitting}
                  className="w-full justify-start"
                >
                  {isSubmitting && pendingAction === 'APPROVE' ? (
                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Mark as Habitual Complainant
                </Button>
              )}
              
              {/* Show Reject button for both SUSPECTED and HABITUAL */}
              <Button
                variant="destructive"
                onClick={() => handleAction('REJECT')}
                disabled={isSubmitting}
                className="w-full justify-start"
              >
                {isSubmitting && pendingAction === 'REJECT' ? (
                  <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {key === HABITUAL_COMPLAINANT_TAGS.SUSPECTED_HABITUAL_COMPLAINANT 
                  ? 'Remove Suspicious  Tag'
                  : 'Remove Habitual Complainant Tag'
                }
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Modal */}
      <OtpPromptModal
        open={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
          setPendingAction(null);
        }}
        isSubmitting={isSubmitting}
        onConfirm={handleOtpConfirm}
        metadata={`Complainant tag ${pendingAction} for complaint ${complaintId}`}
      />
    </>
  );
};

export default ComplainantTag;
