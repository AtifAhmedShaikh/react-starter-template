"use client";

import { COMPLAINT_STATUS, HTTP_METHODS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { completeSchema } from "@/schema/chargeSchema";
import {
  fetchLocationByIdAsync,
  selectLocationById,
  selectLocationByIdLoading,
} from "@/stores/slices/metadataSlice";
// Generic placeholders for future API integration
// import {
//   fetchChargesByLocationAsync,
//   selectForwardDetails,
//   selectForwardDetailsLoading,
//   selectStatus,
// } from "@/stores/slices/metadataSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useForwardCharges = ({ complaint, handleForwardSubmit }) => {
  const [locationHierarchy, setLocationHierarchy] = useState([
    { level: 1, parentId: null, selectedId: "", options: [] },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redux selectors
  // Generic placeholders for future API integration
  const forwardDetails = { roles: [] }; // Will be fetched from API in future
  const forwardDetailsLoading = false;
  const locationById = useSelector(selectLocationById);
  const locationByIdLoading = useSelector(selectLocationByIdLoading);
  const dispatch = useDispatch();
  const statusArray = []; // Will be fetched from API in future

  // Form setup
  const form = useForm({
    resolver: yupResolver(completeSchema),
    defaultValues: {
      role: "",
      location: "",
      currentCharge: "",
      charges: [],
      remarks: "",
      attachment: null,
      confirm: false,
    },
    mode: "onChange",
  });

  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;

  // Watch form values
  const role = watch("role");
  const location = watch("location");
  const currentCharge = watch("currentCharge");
  const selectedCharges = watch("charges");

  // Derived values
  const selectedLocation = locationById?.find((loc) => loc.id === location);
  const chargesOptions = selectedLocation?.charges || [];

  const fetchLocationLevel = async (level, parentId, hierarchy, maxLevel) => {
    try {
      const res = await dispatch(
        fetchLocationByIdAsync({ level, parentId }),
      ).unwrap();
      const updatedHierarchy = [...hierarchy];
      const index = updatedHierarchy.findIndex(
        (entry) => entry.level === level,
      );

      updatedHierarchy[index].options = res.data || [];
      updatedHierarchy[index].loading = false;

      // Add next level only if not yet reached max level
      if (level < maxLevel) {
        updatedHierarchy.push({
          level: level + 1,
          parentId: null,
          selectedId: "",
          options: [],
          loading: false,
        });
      }

      setLocationHierarchy(updatedHierarchy);
    } catch (err) {
      console.error("Error fetching location level:", err);
    }
  };

  useEffect(() => {
    if (role) {
      const selectedRole = forwardDetails?.roles?.find(
        (r) => r.roleId === role,
      );
      const level = selectedRole?.role?.level;

      if (level) {
        const initHierarchy = [
          {
            level: 1,
            parentId: null,
            selectedId: "",
            options: [],
            loading: true,
          },
        ];
        setLocationHierarchy(initHierarchy);

        // Fetch first level
        fetchLocationLevel(1, null, initHierarchy, level);
      }

      setValue("location", "");
      setValue("currentCharge", "");
    }
  }, [role]);

  useEffect(() => {
    console.log("w--");
    if (
      complaint?.status?.originalStatus ===
      COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED
    ) {
      console.log("--");
      const foundStatus = statusArray?.find(
        (s) =>
          s?.originalStatus === COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED,
      );
      setValue("status", foundStatus?.id);
    } else {
      const foundStatus = statusArray?.find(
        (s) =>
          s?.originalStatus === COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED,
      );
      setValue("status", foundStatus?.id);
    }
  }, []);

  // ✅ Extract roles from forwardDetails
  const roles =
    forwardDetails?.roles?.map((r) => ({
      id: r.roleId,
      value: r.role.value,
      level: r.role.level,
    })) || [];

  const handleLocationChange = async (index, selectedId) => {
    const updated = [...locationHierarchy];
    updated[index].selectedId = selectedId;

    // Truncate deeper levels
    updated.splice(index + 1);

    // Fetch next level (if any)
    const nextLevel = updated[index].level + 1;
    const roleObj = forwardDetails?.roles?.find((r) => r.roleId === role);
    const roleLevel = roleObj?.role?.level;

    if (nextLevel <= roleLevel) {
      updated.push({
        level: nextLevel,
        parentId: selectedId,
        selectedId: "",
        options: [],
        loading: true,
      });

      setLocationHierarchy(updated);
      fetchLocationLevel(nextLevel, selectedId, updated, roleLevel);
      setValue("location", selectedId); // inside handleLocationChange when final level reached
    } else {
      // At final level: Fetch Charges for selected location
      dispatch(fetchChargesByLocationAsync(selectedId));
      setValue("location", selectedId); // important for validation
    }

    setLocationHierarchy(updated);
  };

  // Handlers
  const handleAddCharge = async () => {
    if (currentCharge) {
      const charge = chargesOptions.find((c) => c.id === currentCharge);
      if (charge && !selectedCharges.some((c) => c.id === currentCharge)) {
        const newCharges = [...selectedCharges, charge];
        setValue("charges", newCharges);
        setValue("currentCharge", "");
        await trigger("charges");
      }
    }
  };

  const handleRemoveCharge = (chargeId) => {
    const updatedCharges = selectedCharges.filter((c) => c.id !== chargeId);
    setValue("charges", updatedCharges);
    trigger("charges");
  };

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await form.trigger(["role", "location", "charges"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["remarks", "attachment"]);
    }
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Complaint ID
      formData.append("complaintId", complaint.id);

      if (
        complaint?.status?.originalStatus ===
        COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED
      ) {
        const foundStatus = statusArray?.find(
          (s) =>
            s?.originalStatus === COMPLAINT_STATUS.FURTHER_DOCUMENTS_REQUIRED,
        );
        formData.append("statusId", foundStatus?.id);
      } else {
        formData.append("statusId", data?.status);
      }
      // Append charges
      data.charges?.forEach((charge) => {
        formData.append("forwardTos[]", charge.id);
      });

      // Remarks
      formData.append("remarks", data.remarks);

      // Multiple Attachments
      if (Array.isArray(data.attachment)) {
        data.attachment.forEach((file) => {
          formData.append("attachments", file);
        });
      }

      // Debugging output
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await apiHandler(COMPLAINT_APIS.FORWARD_COMPLAINT, {
        method: HTTP_METHODS.POST,
        data: formData,
      });

      if (!response.success) {
        toast.error(response.message);
        return false;
      }

      toast.success("Remarks sent successfully");
      form.reset();
      setCurrentStep(0);
      handleForwardSubmit();
      return true;
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong while submitting the complaint");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(0);
  };

  return {
    // State
    currentStep,
    isSubmitting,

    // Redux data
    roles,
    roleLoading: forwardDetailsLoading,
    locationById,
    locationByIdLoading,

    // Form
    form,
    errors,

    // Watched values
    role,
    location,
    currentCharge,
    selectedCharges,
    chargesOptions,

    // Handlers
    handleAddCharge,
    handleRemoveCharge,
    handleNext,
    handlePrevious,
    onSubmit,
    resetForm,
    locationHierarchy,
    handleLocationChange,
  };
};
