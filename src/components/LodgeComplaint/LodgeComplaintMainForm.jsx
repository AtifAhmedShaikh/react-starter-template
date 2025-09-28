"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { lodgedComplaint } from "@/apis/complaintsApis";
import { complaintSchema } from "@/schema/complaintSchema";
import { selectUser, setActiveTabItem } from "@/stores/slices/authSlice";
import { deformatMobileNumber } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import ComplaintFormTabs from "./ComplaintFormTabs";
import AllegedPeronsForm from "./Steps/AllegedPersonsForm";
import ComplaintDetailsForm from "./Steps/ComplaintDetailsForm";
import ComplaintFormPreview from "./Steps/FormPreview";
import AttachmentUploadStep from "./Steps/UploadAttachmentsStep";
import UserInformationForm from "./Steps/UserInformationForm";
import { OtpPromptModal } from "../reuseable/OTPPromptModal";
import {
  User,
  FileText,
  Paperclip,
  Users,
  CheckCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchDashboardData } from "@/stores/slices/dashboardSlice";

// define form steps for tabs
const stepTabs = [
  { key: "step1", label: "Complaint By", icon: <User className="w-4 h-4 mr-2" /> },
  { key: "step2", label: "Complaint Details", icon: <FileText className="w-4 h-4 mr-2" /> },
  { key: "step3", label: "Attachments (Optional)", icon: <Paperclip className="w-4 h-4 mr-2" /> },
  { key: "step4", label: "Alleged Persons", icon: <Users className="w-4 h-4 mr-2" /> },
  { key: "step5", label: "Review & Submit", icon: <CheckCircle className="w-4 h-4 mr-2" /> },
];


const LodgeComplaintMainForm = () => {
  const user = useSelector(selectUser)
  const [activeTab, setActiveTab] = useState("step1");
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);


  const methods = useForm({
    resolver: yupResolver(complaintSchema),
    mode: "all",
    defaultValues: {
      fullName: user?.fullName || "",
      cnic: user?.cnic || "",
      email: user?.email || "",
      phoneNumber: deformatMobileNumber(user?.phoneNumber) || "",
      address: user?.address || "",
      cityId: user?.cityId || "",
      offenceId: "",
      typeOfPersonId: "",
      zoneId: "",
      subject: "",
      summary: "",
      witnessName: "",
      witnessCnic: "",
      allegedPersons: [],
      otherTypeOfPerson: "",
    },
  });

  const goToNext = async () => {
    let currentStepFields = [];

    if (activeTab === "step1") {
      currentStepFields = ["fullName", "cnic", "email", "phoneNumber", "address", "cityId"];
    } else if (activeTab === "step2") {
      currentStepFields = [
        "offenceId",
        "typeOfPersonId",
        "zoneId",
        "subject",
        "summary",
        "witnessName",
        "witnessCnic",
      ];
    } else if (activeTab === "step4") {
      currentStepFields = methods
        .getValues("allegedPersons")
        ?.map((_, i) => [
          `allegedPersons.${i}.name`,
          `allegedPersons.${i}.designation`,
          `allegedPersons.${i}.departmentId`,
          `allegedPersons.${i}.phoneNumber`,
          `allegedPersons.${i}.address`,
          `allegedPersons.${i}.additionalInfo`,
        ])
        .flat() || [];
    }

    const isValid = await methods.trigger(currentStepFields, { shouldFocus: true });
    const errors = methods.getFieldState ? currentStepFields.filter((field) => methods.getFieldState(field).invalid) : [];
    console.log(methods.getValues());
    if (!isValid && !errors?.includes("allegedPersons")) {
      console.log(errors);
      const invalidFields = errors.join(", ");
      const errorMessage = invalidFields.includes("allegedPersons") ? "Please select the department field" : `Please fill all the required fields: ${invalidFields}`;
      toast.error(errorMessage);
      return;
    }


    const index = stepTabs.findIndex((step) => step.key === activeTab);
    if (index < stepTabs.length - 1) {
      setActiveTab(stepTabs[index + 1].key);
    }
  };


  const goBack = () => {
    const index = stepTabs.findIndex((step) => step.key === activeTab);
    if (index > 0) {
      setActiveTab(stepTabs[index - 1].key);
    }
  };

  // handle complaint submit button click
  const onSubmit = async (data = {}) => {
    const {
      subject,
      summary,
      offenceId,
      typeOfPersonId,
      zoneId,
      witnessName,
      witnessCnic,
      allegedPersons,
      otherOffence="",
      otherTypeOfPerson="",
    } = data;

    const formData = new FormData();

    // Basic fields
    formData.append("subject", subject);
    formData.append("summary", summary);
    formData.append("offenceId", offenceId);
    formData.append("typeOfPersonId", typeOfPersonId);
    formData.append("zoneId", zoneId);
    
    // Only include "Other" fields if they are actually needed
    formData.append("otherOffence", otherOffence || "");
    formData.append("otherTypeOfPerson", otherTypeOfPerson || "");

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    // Prepare and stringify witnesses array for backend
    const witnesses = witnessName && witnessCnic ? [
      {
        name: witnessName,
        cnic: witnessCnic,
      },
    ] : [];
    formData.append("witnesses", JSON.stringify(witnesses));

    // Prepare and stringify allegedPersons
    const transformedAllegedPersons = allegedPersons.map((p) => ({
      fullName: p.name || "",
      designation: p.designation || "",
      mobileNumber: p.phoneNumber || "",
      address: p.address || "",
      additionalInfo: p.additionalInfo || "",
      departmentId: p.departmentId,
      otherDepartment: p.otherDepartment || "",
    }));

    formData.append("allegedPersons", JSON.stringify(transformedAllegedPersons));

    // otp verification
    // 👉 Save payload and show OTP modal
    setPendingPayload(formData);
    setShowOtpModal(true);
    return;
  };


  return (
    <FormProvider {...methods}>
      <div className="max-w-6xl mx-auto sm:px-4 px-2 py-6">
        <h1 className="text-2xl font-bold mb-3">Complaint Details Form</h1>
        <p className="text-sm text-red-600 mb-4">
          Please fill out the following form with your complaint. We will
          review your request and follow up with you as soon as possible.
        </p>

        {/* Urdu Note */}
        <p
          className="text-red-600 mb-6 text-right vazirmatn-font text-[18px] "
          style={{ lineHeight: "35px" }}
        >
          نوٹ : درخواست گزار یا گواہ کے منحرف کی صورت میں شکایات دہندہ کے خلاف
          دفعہ ۱۸۲ تازیرات پاکستان کے تحت کاروائی عمل میں لائی جائے گی اگر مدعی
          نے جھوٹی درخواست دی تو اپ پر حتی کہ عزت کا دعوی کیا جا سکتا ہے۔
        </p>

        <Tabs value={activeTab} className="w-full mt-5">
          <div className="w-full bg-secondary rounded-lg overflow-auto">
            <ComplaintFormTabs steps={stepTabs} activeTab={activeTab} />

          </div>

          {/* STEP 1 */}
          <TabsContent value="step1">
            <UserInformationForm />
            <div className="flex justify-end mt-4">
              <Button onClick={goToNext}>Next</Button>
            </div>
          </TabsContent>

          {/* STEP 2 */}
          <TabsContent value="step2">
            <ComplaintDetailsForm />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={goBack} variant="primaryBorder">Back</Button>
              <Button onClick={goToNext}>Next</Button>
            </div>
          </TabsContent>

          {/* STEP 3 */}
          <TabsContent value="step3">
            <AttachmentUploadStep files={attachments} setFiles={setAttachments} />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={goBack} variant="primaryBorder">Back</Button>
              <Button onClick={goToNext}>Next</Button>
            </div>
          </TabsContent>

          {/* STEP 4 */}
          <TabsContent value="step4">
            <AllegedPeronsForm />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={goBack} variant="primaryBorder">Back</Button>
              <Button onClick={goToNext}>Next</Button>
            </div>
          </TabsContent>



          {/* STEP 5 */}
          <TabsContent value="step5">
            <ComplaintFormPreview attachments={attachments} />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={goBack} variant="primaryBorder">Back</Button>
              <Button onClick={methods.handleSubmit(onSubmit)}>Submit</Button>
            </div>
          </TabsContent>
          <OtpPromptModal
            open={showOtpModal}
            onClose={() => setShowOtpModal(false)}
            isSubmitting={isSubmitting}
            onConfirm={async (otp) => {
              if (!pendingPayload) return;
              setIsSubmitting(true);
              pendingPayload?.set("otp", otp);
              const response = await lodgedComplaint(pendingPayload);
              if (!response.success) {
                toast.error(response?.message);
                setIsSubmitting(false); // stop loading
                return;
              }
              setIsSubmitting(false); // stop loading
              setShowOtpModal(false); // close otp modal
              setPendingPayload(null); // clear pending payload

              toast.success(response.message);
              methods.reset(); // reset form
              setAttachments([]); // clear attachments
              setActiveTab("step1"); // go to step 1
              dispatch(setActiveTabItem("")); // clear active tab from redux store
              navigate("/track-complaints"); // navigate to complaint listing page
            }}
          />
        </Tabs>
      </div>
    </FormProvider>
  );
};

export default LodgeComplaintMainForm;
