import { COMPLAINT_STATUS, FORWARD_COMPLAINT_STATUS, HTTP_METHODS, LOCATION_MAPPER } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { completeSchema } from "@/schema/chargeSchema";
import {
  fetchLocationByIdAsync,
} from "@/stores/slices/metadataSlice";
// Generic placeholders for future API integration
// import {
//   fetchChargesByLocationAsync,
//   selectForwardDetails,
//   selectForwardDetailsLoading,
//   selectStatus
// } from "@/stores/slices/metadataSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft, ChevronRight, Plus, X as CrossIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ComboboxField from "../reuseable/SearchableSelectField";
import ModalWrapper from "../reuseable/ModalWrapper";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { EnhancedStepper } from "../ui/stepper";
import { StepThree } from "./ForwardComplaintSteps/StepThree";
import { StepTwo } from "./ForwardComplaintSteps/StepTwo";
import SimpleCombobox from "./SimpleCombox";
import { Badge } from "../ui/badge";
import { Send } from "lucide-react";
import { fetchDashboardData, updateTabCountKey } from "@/stores/slices/dashboardSlice";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionKeys } from "@/constants/permissions";



const ForwardToChargesModal = ({ isOpen, onClose, complaint, handleForwardSubmit, statusArray, complaintResponsibles = [] }) => {
  const dispatch = useDispatch();
  const { hasPermission } = usePermissions()

  // Redux
  // Generic placeholders for future API integration
  const forwardDetails = { roles: [] }; // Will be fetched from API in future
  const forwardDetailsLoading = false;
  const statusList = []; // Will be fetched from API in future

  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationHierarchy, setLocationHierarchy] = useState([]);
  const [chargesOptions, setChargesOptions] = useState([]);
  const [selectedCharges, setSelectedCharges] = useState([]);

  // Form
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

  const { watch, setValue, trigger, handleSubmit, reset, formState: { errors } } = form;

  const role = watch("role");
  const currentCharge = watch("currentCharge");

  // ========== 🔁 Location Hierarchy ==========
  const fetchLocationLevel = async (level, parentId, hierarchy, maxLevel) => {
    try {
      const locationsOptions = await dispatch(fetchLocationByIdAsync({ level, parentId })).unwrap();
      const updatedHierarchy = [...hierarchy];
      const index = updatedHierarchy.findIndex((entry) => entry.level === level);
      if (index !== -1) {
        updatedHierarchy[index].options = locationsOptions;
        updatedHierarchy[index].loading = false;
      }

      console.log("locationsOptions", { locationsOptions, index, updatedHierarchy, level, maxLevel });

      if (level < maxLevel) {
        updatedHierarchy.push({ level: level + 1, parentId: null, selectedId: "", options: [], loading: false });
      }

      setLocationHierarchy(updatedHierarchy);
    } catch (err) {
      console.error("Error fetching location level:", err);
    }
  };

  const handleLocationChange = async (index, selectedId) => {
    const updated = [...locationHierarchy];
    updated[index].selectedId = selectedId;

    // Clear deeper levels
    updated.splice(index + 1);

    const nextLevel = updated[index].level + 1;
    const roleObj = forwardDetails?.roles?.find((r) => r.roleId === role);
    const roleLevel = roleObj?.role?.level;
    console.log("handleLocationChange", { selectedId, nextLevel, roleLevel });
    if (nextLevel <= roleLevel) {
      updated.push({ level: nextLevel, parentId: selectedId, selectedId: "", options: [], loading: true });
      setLocationHierarchy(updated);
      fetchLocationLevel(nextLevel, selectedId, updated, roleLevel);
    } else {
      setValue("location", selectedId);
      dispatch(fetchChargesByLocationAsync(selectedId))
        .unwrap()
        .then((res) => setChargesOptions(res.selectedLocationCharges || []));
    }

    setLocationHierarchy(updated);
  };

  // ========== 🧠 Role Changed: Load Location Tree ==========
  useEffect(() => {
    if (!role) return;

    const roleObj = forwardDetails?.roles?.find((r) => r.roleId === role);
    const roleLevel = roleObj?.role?.level;

    const initial = [{ level: 1, parentId: null, selectedId: "", options: [], loading: true }];
    setLocationHierarchy(initial);
    fetchLocationLevel(1, null, initial, roleLevel);

    setChargesOptions([]);
    setValue("location", "");
    setValue("currentCharge", "");
  }, [role]);

  // ========== 🧠 Status Default ==========
  useEffect(() => {
    const furtherVerification = statusList?.find(s => s?.originalStatus === COMPLAINT_STATUS.FURTHER_VERIFICATION);
    const fallback = statusList?.find(s => s?.originalStatus === complaint?.status?.originalStatus);

    // If current complaint status is Initial Application, set the status the further verification status
    if (complaint?.status?.originalStatus === COMPLAINT_STATUS.INITIAL_APPLICATION) {
      setValue("status", furtherVerification?.id);
    } else if (fallback) {
      setValue("status", fallback?.id);
    }

  }, []);

  // ========== ➕ Add / Remove Officer ==========
  const handleAddCharge = async () => {
    if (!currentCharge) return;
    const found = chargesOptions.find(c => c.id === currentCharge);
    if (!found || selectedCharges.some(c => c.id === currentCharge) || selectedCharges?.length > 0) return;
    setSelectedCharges([...selectedCharges, found]);
    setValue("charges", [...selectedCharges, found]);
    setValue("currentCharge", "");
    await trigger("charges");
  };

  const handleRemoveCharge = (id) => {
    const updated = selectedCharges.filter(c => c.id !== id);
    setSelectedCharges(updated);
    setValue("charges", updated);
    trigger("charges");
  };

  // ========== ⏭ Step Controls ==========
  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger(["role", "location", "charges"]);
    } else if (currentStep === 1) {
      isValid = await trigger(["remarks", "attachment"]);
    }
    if (isValid) setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const handlePrevious = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("complaintId", complaint.id);
      const foundStatus = statusList.find(s => s.id === data.status);
      formData.append("statusId", foundStatus?.id);
      selectedCharges.forEach(c => formData.append("forwardTos[]", c.id));
      formData.append("remarks", data.remarks);
      if (Array.isArray(data.attachment)) {
        data.attachment.forEach(file => formData.append("attachments", file));
      }

      const res = await apiHandler(COMPLAINT_APIS.FORWARD_COMPLAINT, {
        method: HTTP_METHODS.POST,
        data: formData,
      });

      if (!res.success) return toast.error(res.message);

      toast.success("Complaint forwarded successfully");
      handleForwardSubmit();
      handleClose();

      // update sidebar count
      console.log({ complaintResponsibles })
      const isInboxTab = Array.isArray(complaintResponsibles) ? complaintResponsibles.find(p => p?.status === FORWARD_COMPLAINT_STATUS.INBOX) : false;
      // check if user has permission to view new complaints so that we can update the count of new complaints tab
      if (hasPermission(PermissionKeys.can_view_new_complaints)) return dispatch(updateTabCountKey({ key: isInboxTab ? "inboxCount" : "newComplaintsCount", type: "decrement" }));
      // if user doesn't have permission to view new complaints, we update the count of inbox complaints
      dispatch(updateTabCountKey({ key: isInboxTab ? "inboxCount" : "newCount", type: "decrement" }));
      dispatch(fetchDashboardData(true))
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
      dispatch(updateTabCountKey({ key: "sentCount", type: "increment" }));
    }
  };

  const handleClose = () => {
    reset();
    setLocationHierarchy([]);
    setSelectedCharges([]);
    setChargesOptions([]);
    setCurrentStep(0);
    onClose();
  };

  const roles =
    forwardDetails?.roles?.map(r => ({
      id: r.roleId,
      key: r?.role?.key,
      value: r.role.value,
      level: r.role.level,
    })) || [];

  const filteredCharges = chargesOptions.filter(c => !selectedCharges.some(sc => sc.id === c.id)).filter(charge => {
    const selectedRole = Array.isArray(roles) ? roles.find(r => r.id === role) : null
    if (selectedRole) {
      return charge?.role?.key === selectedRole?.key;
    }
    return charge;
  });

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Forward Complaint" className="sm:max-w-3xl sm:px-5 px-2 w-full">
      <div className="space-y-6 max-h-[80vh] overflow-auto sm:px-4 px-2">
        <EnhancedStepper currentStep={currentStep} />
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="min-h-[400px]">
              {currentStep === 0 && (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <ComboboxField
                      name="role"
                      label="Designation"
                      placeholder="Select Designation"
                      options={roles}
                      valueKey="id"
                      labelKey="value"
                      error={errors.role?.message}
                      isLoading={forwardDetailsLoading}
                      disabled={selectedCharges?.length > 0}
                    />
                    {locationHierarchy.map((entry, idx) => (
                      <SimpleCombobox
                        key={entry.level}
                        name={`location_level_${entry.level}`}
                        label={`Select ${LOCATION_MAPPER[entry.level]}`}
                        options={entry.options}
                        value={entry.selectedId}
                        valueKey="id"
                        labelKey="name"
                        onValueChange={(id) => handleLocationChange(idx, id)}
                        error={errors[`location_level_${entry.level}`]?.message}
                        isLoading={entry.loading}
                        disabled={selectedCharges?.length > 0}
                      />
                    ))}
                  </div>
                  {filteredCharges.length > 0 && (
                    <Card className="border-dashed mt-2">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Officer
                        </CardTitle>
                      </CardHeader>
                      <CardContent className={"!pt-0 sm:px-5 px-2"}>

                        {watch("currentCharge") && selectedCharges?.length === 0 && (
                          <div className="p-2 text-yellow-800 rounded-md text-sm transition-all duration-300 ease-in-out transform opacity-0 animate-fade-in">
                            Officer selected. Please click the <strong>Add</strong> button to proceed.
                          </div>
                        )}
                        <div className="flex gap-3 items-end">
                          <div className="flex-1 min-w-0">
                            <ComboboxField
                              name="currentCharge"
                              placeholder="Search officer"
                              options={filteredCharges.map(c => ({
                                ...c,
                                displayLabel: `${c.assignedPerson?.fullName || "Unassigned"} (${c.chargeName})`,
                              }))}
                              valueKey="id"
                              labelKey="displayLabel"
                              error={errors.currentCharge?.message}
                              disabled={selectedCharges?.length > 0}
                            />
                          </div>
                          <Button onClick={handleAddCharge} type="button" className="flex-shrink-0" disabled={selectedCharges?.length > 0}>
                            <Plus className="h-4 w-4 mr-2" /> Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedCharges.length > 0 && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          Selected Officers <Badge>{selectedCharges.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedCharges.map((c) => (
                          <div key={c.id} className="flex justify-between overflow-auto items-center p-3 border rounded-lg my-2 transition-all duration-300 ease-in-out transform opacity-0 animate-fade-in">
                            <span className={"overflow-hidden"}>{c.assignedPerson?.fullName || "Unassigned"} ({c.chargeName})</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCharge(c.id)}
                              className="text-destructive"
                            >
                              <CrossIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {currentStep === 1 && (
                <StepTwo form={form} errors={errors} statusArray={statusArray} complaint={complaint} />
              )}

              {currentStep === 2 && (
                <StepThree form={form} selectedCharges={selectedCharges} statusArray={statusArray} />
              )}
            </div>

            <Separator />

            <div className="flex justify-between sticky bottom-0 bg-white py-3">
              <Button type="button" onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              {currentStep < 2 ? (
                <Button type="button" onClick={handleNext} disabled={selectedCharges?.length === 0}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || !watch("confirm")} loading={isSubmitting}>
                  <Send className="h-4 w-4" /> Submit Complaint
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </ModalWrapper>
  );
};


export default ForwardToChargesModal