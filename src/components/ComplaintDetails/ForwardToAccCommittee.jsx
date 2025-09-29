import FileUploaderWithPreview from "@/components/reuseable/FileUploaderWithPreview";
import ModalWrapper from "@/components/reuseable/ModalWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { COMPLAINT_STATUS, HTTP_METHODS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { forwardToACCSchema } from "@/schema/complaintSchema";
// Generic placeholders for future API integration
// import { fetchForwardToCommittieeDetailsAsync, selectACCCommittees, selectStatus } from "@/stores/slices/metadataSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import StatusBadge from "../reuseable/StatusBadge";
import SimpleCombobox from "./SimpleCombox";
import { fetchDashboardData } from "@/stores/slices/dashboardSlice";

const ForwardToAccCommitteeModel = ({ isOpen, onClose, complaint, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationLevels, setLocationLevels] = useState([]); // dynamic list of selects
  const [memberLevel, setMemberLevel] = useState(null);
  const [correspondingCommittees, setCorrespondingCommittees] = useState([]);
  const dispatch = useDispatch();
  // Generic placeholders for future API integration
  const statusesArray = []; // Will be fetched from API in future

  const accCommittiees = []; // Will be fetched from API in future

  const methods = useForm({
    resolver: yupResolver(forwardToACCSchema),
    defaultValues: {
      remarks: "",
      attachments: [],
      selectedMember: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors },
    control,
  } = methods;

  const selectedMemberId = watch("selectedMember");

  // Fetch ACC committees when modal opens
  useEffect(() => {
    if (isOpen) dispatch(fetchForwardToCommittieeDetailsAsync());
  }, [dispatch, isOpen]);

  // When member changes, reset levels and fetch initial locations if needed
  useEffect(() => {
    if (!selectedMemberId) {
      setMemberLevel(null);
      setLocationLevels([]);
      return;
    }

    const member = accCommittiees.find(m => m.id === selectedMemberId);
    if (!member) return;

    const roleLevel = member.level; // take level directly from member
    setMemberLevel(roleLevel);
    setLocationLevels([]);

    if (roleLevel === 0) {
      // No location selection needed
      fetchCorrespondingCommittees({ locationId: null })
      return;
    }

    // Load first set of locations
    fetchLocations({ memberId: selectedMemberId, level: 1 }, "Division");
  }, [selectedMemberId, accCommittiees]);

  // Fetch locations helper
  const fetchLocations = async ({ memberId, parentId, level }, label) => {
    const res = await apiHandler(COMPLAINT_APIS.GET_COMMITTIEE_LOCATIONS, {
      params: { memberId, parentId, level },
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setLocationLevels(prev => [
      ...prev,
      {
        label,
        options: res.data,
        selectedId: null,
        level,
      },
    ]);
  };

  // todo: Fetch corresponding commiteee for selected location
  const fetchCorrespondingCommittees = async ({ locationId }) => {
    const res = await apiHandler(COMPLAINT_APIS.GET_LOCATION_CORRESPONDING_COMMITTIEES, {
      params: { locationId }, // need to pass selected location id
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    setCorrespondingCommittees(Array.isArray(res.data) ? res.data : []);
  };

  // Handle location change in a specific dropdown
  const handleLocationChange = (index, selectedId) => {
    setLocationLevels(prev => {
      const updated = [...prev];
      updated[index].selectedId = selectedId;
      updated.splice(index + 1); // remove deeper levels
      return updated;
    });

    // If this is not the last level required, fetch next level
    const nextLevel = index + 2; // because index starts from 0 but level from 1
    console.log("Next level", { nextLevel, memberLevel, isTrue: nextLevel <= memberLevel })
    if (nextLevel <= memberLevel) {
      const label =
        nextLevel === 2 ? "District" :
          nextLevel === 3 ? "City" : `Level ${nextLevel}`;
      fetchLocations(
        { memberId: selectedMemberId, parentId: selectedId, level: nextLevel },
        label
      );
    } else {
      // If this is not the last level required, fetch corresponding committees
      fetchCorrespondingCommittees({ locationId: memberLevel === 0 ? null : selectedId });
    }
  };

  const submitForm = async (data) => {
    setIsSubmitting(true);
    const openInquiryStatus = statusesArray?.find(s => s?.originalStatus === COMPLAINT_STATUS.OPEN_INQUIRY)
    const documentsRequiredStatus = statusesArray?.find(s => s?.originalStatus === COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED);
    const canKeepCurrentStatus = complaint?.status?.originalStatus === COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED;

    const formData = new FormData();
    formData.append("complaintId", complaint?.id);
    formData.append("remarks", data.remarks);
    formData.append("forwardTos[]", data.selectedCommittieeCharge);
    formData.append("statusId", canKeepCurrentStatus ? documentsRequiredStatus?.id : openInquiryStatus?.id);

    if (memberLevel > 0) {
      const lastSelected = locationLevels[locationLevels.length - 1]?.selectedId;
      if (!lastSelected) {
        toast.error("Please complete all location selections");
        return;
      }
      // formData.append("locationId", lastSelected);
    }

    if (data.attachments?.length) {
      data.attachments.forEach(file => formData.append("attachments", file));
    }

    const res = await apiHandler(COMPLAINT_APIS.FORWARD_COMPLAINT, {
      method: HTTP_METHODS.POST,
      data: formData,
    });
    setIsSubmitting(false);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    dispatch(fetchDashboardData(true))
    onSubmit?.();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Forward TO ACC Committee">
      <FormProvider {...methods}>
        <div className="mb-4">
          <StatusBadge status={complaint?.status} />
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          {/* ACC Committee Select */}
          <SimpleCombobox
            label="Select ACC Committee Level"
            name="selectedMember"
            placeholder="ACC Committee"
            options={accCommittiees.map(m => ({
              id: m.id,
              value: m.name,
            }))}
            error={errors.selectedMember?.message}
            onValueChange={(val) => {
              setValue("selectedMember", val)
              setValue("selectedCommittieeCharge", "")
            }}
          />

          {/* Dynamic location selects */}
          {locationLevels.map((lvl, idx) => (
            <div key={idx} className="transition-all duration-300 ease-in-out transform opacity-0 animate-fade-in">
              <SimpleCombobox
                label={`Select ${lvl.label}`}
                name={`location_${idx}`}
                placeholder={`${lvl.label}`}
                options={lvl.options.map(opt => ({
                  id: opt.id,
                  value: opt.name,
                }))}
                error={errors[`location_${idx}`]?.message}
                onValueChange={(val) => handleLocationChange(idx, val)}
              />
            </div>
          ))}

          <div>

            <SimpleCombobox
              label="Select ACC Committee"
              name="selectedCommittieeCharge"
              placeholder="ACC Committee"
              options={correspondingCommittees.map(m => ({
                id: m.id,
                value: m.chargeName,
              }))}
              error={errors.selectedCommittieeCharge?.message}
              onValueChange={(val) => setValue("selectedCommittieeCharge", val)}
            />

          </div>

          {/* Remarks */}
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <div className="space-y-1">
                <Textarea placeholder="Write your remarks here..." {...field} className={"border-primary/60 hover:border-primary/80 hover:bg-primary/10"} />
                {errors.remarks && <span className="text-sm text-red-500">{errors.remarks.message}</span>}
              </div>
            )}
          />

          <Separator />

          {/* Attachments */}
          <Controller
            name="attachments"
            control={control}
            render={({ field }) => (
              <div className="space-y-1">
                <FileUploaderWithPreview
                  files={field.value}
                  setFiles={(files) => field.onChange(files)}
                  wrapperWidth="!h-32"
                />
                {errors.attachments && (
                  <span className="text-sm text-red-500">{errors.attachments.message}</span>
                )}
              </div>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="ml-2" disabled={!isValid || isSubmitting} loading={isSubmitting} >
              Send
            </Button>
          </div>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
};

export default ForwardToAccCommitteeModel;
