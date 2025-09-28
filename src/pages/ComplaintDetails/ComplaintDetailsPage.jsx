"use client";

import AllegedPersonsInformation from "@/components/ComplaintDetails/AllegedPersonsInformation";
import ComplainantInformation from "@/components/ComplaintDetails/ComplainantInformation";
import ComplainantTag from "@/components/ComplaintDetails/ComplainantTag";
import ComplaintAttachments from "@/components/ComplaintDetails/ComplaintAttachments";
import ComplaintHistoryUI from "@/components/ComplaintDetails/ComplaintHistory";
import ComplaintInformation from "@/components/ComplaintDetails/ComplaintInformation";
import DownloadComplaint from "@/components/ComplaintDetails/DownloadComplaint";
import FileComplaintModel from "@/components/ComplaintDetails/FileComplaintModel";
import FollowUpMessagesUI from "@/components/ComplaintDetails/FollowUpMessages";
import FollowUpModal from "@/components/ComplaintDetails/FollowUpModel";
import ForwardToAccCommitteeModel from "@/components/ComplaintDetails/ForwardToAccCommittee";
import ForwardToModal from "@/components/ComplaintDetails/ForwardToModal";
import ForwardBackModal from "@/components/ComplaintDetails/FowardBack/ForwardBackModal";
import GroupComplaintsModal from "@/components/ComplaintDetails/GroupedComplaintModel";
import IrreleventComplaintModel from "@/components/ComplaintDetails/IrreleventComplaintModel";
import PrintComplaint from "@/components/ComplaintDetails/PrintComplaint";
import ReferComplaintModal from "@/components/ComplaintDetails/ReferComplaintModal";
import ResolvedComplaintModel from "@/components/ComplaintDetails/ResolvedWithoutComplaintModel";
import ResolveWithActionModal from "@/components/ComplaintDetails/ResolveWithActionModal";
import { Button } from "@/components/ui/button";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { apiHandler } from "@/lib/apiWrapper";
import { selectUser } from "@/stores/slices/authSlice";
import { fetchForwardDetailsAsync, fetchStatusAsync, selectForwardDetails, selectForwardDetailsLoading, selectStatus } from "@/stores/slices/metadataSlice";
import { 
  FileText, 
  LoaderCircle, 
  Mail, 
  Shield, 
  ArrowLeft, 
  Trash2, 
  Ban, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Users, 
  RotateCcw, 
  Shredder,
  MessageSquareShare
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { hasPermission } = usePermissions();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);
  const forwardDetails = useSelector(selectForwardDetails)
  const forwardDetailsLoading = useSelector(selectForwardDetailsLoading)
  const statusArray = useSelector(selectStatus)
  const navigate = useNavigate()

  const handleModalOpen = (modalName) => setActiveModal(modalName);
  const handleModalClose = () => setActiveModal(null);

  const fetchComplaint = async () => {
    setLoading(true);
    const response = await apiHandler(`${COMPLAINT_APIS.GET_COMPLAINT_BY_ID}/${id}`);
    if (!response.success) {
      toast.error(response.message);
      setComplaint(null);
    } else {
      setComplaint(response.data);
    }
    setLoading(false);
  };
  const fetchHistory = async () => {
    setHistoryLoading(true);
    const response = await apiHandler(`${COMPLAINT_APIS.GET_COMPLAINT_TRACKING_INFO}/${id}`);
    console.log("HISTORY RESPONSE ARE", response?.data);
    setHistory(response.data || {});
    setHistoryLoading(false);
  };



  const handleRefetchComplaint = async (withHistory = true) => {
    await fetchComplaint();
    if (withHistory) fetchHistory();
  };

  useEffect(() => {
    (async () => {
      dispatch(fetchStatusAsync());
      await handleRefetchComplaint()
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-2xl text-center mt-10 text-muted-foreground">
        Complaint not found.
      </div>
    );
  }

  const { isClosedCase = false, hasAlreadyForwarded, canOpenInquiry, canResolve } = history?.metadata || {}


  const ActionButton = <>

    {hasPermission(PermissionKeys.can_forward_complaint) && !isClosedCase && !hasAlreadyForwarded && (
      <Button className="px-6 py-1 flex items-center gap-2" onClick={() => {
        const isEmpty = !forwardDetails || Object.keys(forwardDetails).length === 0;
        if (!forwardDetailsLoading && isEmpty) {
          dispatch(fetchForwardDetailsAsync());
        }
        handleModalOpen("forward")
      }}

      >
        <MessageSquareShare className="w-5 h-5" />
         Forward Complaint
      </Button>
    )}

    {hasPermission(PermissionKeys.can_forward_back_complaint) && !hasAlreadyForwarded && !isClosedCase && (
      <Button className="px-6 py-1 flex items-center gap-2" onClick={() => {
        dispatch(fetchForwardDetailsAsync(complaint?.id));
        handleModalOpen("forwardBack")
      }}>
        <RotateCcw className="w-5 h-5" /> Submit  Back
      </Button>
    )}

    {hasPermission(PermissionKeys.can_send_follow_up_message) && (
      <Button
        variant="outline"
        className="px-6 py-1 flex items-center gap-2"
        onClick={() => handleModalOpen("followUp")}
      >
        <Mail className="w-5 h-5" /> Follow-Up Message
      </Button>
    )}

    {hasPermission(PermissionKeys.can_dispose_complaint) && !isClosedCase && (
      <Button
        variant={"destructive"}
        className=" bg-red-500 px-6 py-1 flex items-center gap-2"
        onClick={() => handleModalOpen("dispose")}
      >
        <Shredder className="w-5 h-5" /> Dispose/File Complaint
      </Button>
    )}

    {hasPermission(PermissionKeys.can_irrelevent_complaint) && !isClosedCase && (
      <Button
        variant={"destructive"}

        className="px-6 py-1 bg-red-500 flex items-center gap-2"
        onClick={() => handleModalOpen("irrelevent")}
      >
        <Ban className="w-5 h-5" /> Dispose/Irrelevant Complaint
      </Button>
    )}

    {hasPermission(PermissionKeys.can_referred_complaints) && !isClosedCase && (
      <Button
        variant={"destructive"}
        onClick={() => handleModalOpen("refer")}
        className="px-6 py-1 bg-red-500 flex items-center gap-2"
      >
        <ExternalLink className="w-5 h-5" /> Refer Complaint
      </Button>
    )}

    {hasPermission(PermissionKeys.can_resolve_with_action) && canResolve && (
      <Button
        className="px-6 py-1 flex items-center gap-2"
        onClick={() => handleModalOpen("resolved")}
      >
        <CheckCircle className="w-5 h-5" /> Resolved With Action
      </Button>
    )}

    {hasPermission(PermissionKeys.can_resolve_without_action) && canResolve && (
      <Button
        className="px-6 py-1 flex items-center gap-2"
        onClick={() => handleModalOpen("resolvedWithoutAction")}
      >
        <XCircle className="w-5 h-5" /> Resolved with No Action
      </Button>
    )}

    {hasPermission(PermissionKeys.can_forward_to_acc_committee) && canOpenInquiry && (
      <Button
        className="px-6 py-1 flex items-center gap-2 bg-primary/80 "
        onClick={() => handleModalOpen("forwardToAccCommittee")}
      >
        <Users className="w-5 h-5" /> Forward To ACC Committee
      </Button>
    )}
  </>

  return (
    <div className="min-h-screen py-12 sm:px-10 sm:max-w-full w-full">
      <div className="flex flex-col gap-4 mb-4 ">
      <div className={"flex justify-between gap-4"}>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
             Back
            </Button>
        <div className="flex items-center gap-4 flex-wrap justify-end ">
          <PrintComplaint complaintId={complaint.id} />
          <DownloadComplaint complaintId={complaint.id} />
        </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-end ">
          {historyLoading ? <LoaderCircle className="w-5 h-5 animate-spin text-primary" /> : ActionButton}
        </div>
      </div>


      <div className=" mx-auto border-primary/20 border-2 shadow-lg rounded-2xl p-8">
        <h1 className="sm:text-3xl text-xl font-bold text-center text-primary mb-8 flex items-center justify-center gap-2">
          <FileText className="w-7 h-7" /> Complaint Details
        </h1>
        
    {hasPermission(PermissionKeys.can_mark_as_habitual_complainant) && <div className="my-4">
        {complaint?.user?.complainantTag?.value && (
          <ComplainantTag 
            complainantTag={complaint.user.complainantTag}
            complaintId={complaint.id}
            userId={complaint.user.id}
            onUpdate={handleRefetchComplaint}
          />
        )}
    </div>}

        {/* Complainant Info */}
        <ComplainantInformation complaint={complaint} handleModalOpen={handleModalOpen} />

        {/* Complaint Info */}
        <ComplaintInformation complaint={complaint} />

        {/* Alleged Persons */}
        <AllegedPersonsInformation complaint={complaint} />

        <ComplaintAttachments attachments={complaint.attachments} />

        {/* Action Button */}
        <div className="flex flex-wrap mt-10 gap-4">
          {ActionButton}
        </div>


        <FollowUpMessagesUI followUpMessages={complaint.followUpMessages} complainer={complaint.user} />

        {hasPermission(PermissionKeys.can_send_follow_up_message) && (
          <FollowUpModal
            isOpen={activeModal === "followUp"}
            onClose={handleModalClose}
            complaintId={complaint.id}
            handleRefetch={() => {
              handleRefetchComplaint()
              handleModalClose()
            }}
          />
        )}

      </div>
      {historyLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
        </div>) : (
        <ComplaintHistoryUI
          complaint={complaint}
          history={history}
          loading={historyLoading}
        />
      )}


      {hasPermission(PermissionKeys.can_forward_complaint) && (
        <ForwardToModal
          isOpen={activeModal === "forward"}
          onClose={handleModalClose}
          complaint={complaint}
          statusArray={statusArray}
          handleForwardSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
          complaintResponsibles={history?.complaintResponsibles}
        />
      )}

      {hasPermission(PermissionKeys.can_forward_back_complaint) && (
        <ForwardBackModal
          isOpen={activeModal === "forwardBack"}
          onClose={handleModalClose}
          complaint={complaint}
          user={user}
          forwardDetails={forwardDetails}
          handleRefetch={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}


      {hasPermission(PermissionKeys.can_dispose_complaint) && !complaint?.stats?.isDisposed && (
        <FileComplaintModel
          isOpen={activeModal === "dispose"}
          onClose={handleModalClose}
          complaint={complaint}
          onSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}

      {hasPermission(PermissionKeys.can_irrelevent_complaint) && !complaint?.stats?.notRelevent && (
        <IrreleventComplaintModel isOpen={activeModal === "irrelevent"}
          onClose={handleModalClose}
          complaint={complaint}
          onSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}

      {hasPermission(PermissionKeys.can_referred_complaints) && (
        <ReferComplaintModal isOpen={activeModal === "refer"}
          onClose={handleModalClose}
          complaint={complaint}
          onSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}

      {hasPermission(PermissionKeys.can_resolve_without_action) && (
        <ResolvedComplaintModel isOpen={activeModal === "resolvedWithoutAction"}
          complaint={complaint}
          onClose={handleModalClose}
          onSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}


      {hasPermission(PermissionKeys.can_resolve_with_action) && !complaint?.stats?.isResolved && (
        <ResolveWithActionModal isOpen={activeModal === "resolved"}
          onClose={handleModalClose}
          complaint={complaint}
          onSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}

      {hasPermission(PermissionKeys.can_forward_to_acc_committee) && (
        <ForwardToAccCommitteeModel isOpen={activeModal === "forwardToAccCommittee"}
          complaint={complaint}
          statusArray={statusArray}
          onClose={handleModalClose}
          onSubmit={() => {
            handleRefetchComplaint()
            handleModalClose()
          }}
        />
      )}

      {hasPermission(PermissionKeys.can_group_complaints) && (
        <GroupComplaintsModal
          isOpen={activeModal === "groupComplaints"}
          onClose={handleModalClose}
          refNumber={complaint?.refNo}
          complaintGroupId={complaint?.groupId}
        />
      )}

    </div>
  );
};

export default ComplaintDetailsPage;
