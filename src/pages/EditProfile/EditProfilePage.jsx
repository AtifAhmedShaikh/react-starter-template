import ChangeProfileImage from "@/components/Profile/ChangeProfile";
import ComboboxField from "@/components/reuseable/SearchableSelectField";
import { OtpPromptModal } from "@/components/reuseable/OTPPromptModal";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { encryptValue } from "@/lib/encryption";
import { editProfileSchema } from "@/schema/userSchema";
import { selectUser, updateUserAsync, updateUserSensitiveFieldsAsync } from "@/stores/slices/authSlice";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";
import { deformatCnic, formatCharacterOnlyInput, formatCnic, formatCNICInput, formatMobileNumber, formatPhoneNumberInput } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCheck, CheckCircle, Info, Lock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const EditProfilePage = () => {
    const user = useSelector(selectUser);
    const cities = useSelector(selectCities);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState({ savingProfileDetails: false, savingSensitiveFeilds: false });
    // Track sensitive field editing
    const [sensitiveEdit, setSensitiveEdit] = useState({
        email: false,
        phoneNumber: false,
        isOpenOtpModal: false
    });
    const { hasPermission } = usePermissions();
    const canEditProfile = hasPermission(PermissionKeys.can_edit_profile)
    const canChangeProfileImage = hasPermission(PermissionKeys.can_change_profile_image)

    const methods = useForm({
        resolver: yupResolver(editProfileSchema),
        defaultValues: {
            fullName: "",
            cnic: "",
            email: "",
            phoneNumber: "",
            address: "",
        },
        mode: "all",
    });

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        getValues,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (user) {
            const formattedCnic = formatCnic(user.cnic);
            setValue("cnic", formattedCnic);
            setValue("city", user.cityId ?? "");
            setValue("fullName", user.fullName || "");
            setValue("email", user.email || "");
            setValue("phoneNumber", formatMobileNumber(user.phoneNumber || ""));
            setValue("address", user.address || "");
        }
    }, [user]);


    useEffect(() => {
        dispatch(fetchCitiesAsync());
    }, []);

    // Helper function to check if there are any changes in the form data
    const hasFormChanges = (formData={}) => {
        if (!user) return false;
        
        const originalData = {
            fullName: user.fullName || "",
            cnic: formatCnic(user.cnic),
            email: user.email || "",
            phoneNumber: formatMobileNumber(user.phoneNumber || ""),
            address: user.address || "",
            city: user.cityId ?? ""
        };
        
        const currentData = {
            fullName: formData?.fullName || "",
            cnic: formData?.cnic,
            email: formData?.email || "",
            phoneNumber: formData?.phoneNumber,
            address: formData?.address || "",
            city: formData?.city ?? ""
        };
        
        return Object.keys(originalData).some(key => originalData[key] !== currentData[key]);
    };

    const onSubmit = async (data) => {
        // Check if there are any changes before making API call
        if (!hasFormChanges(data)) {
            toast.info("No changes to save. Your profile is already up to date.");
            setIsEditing(false);
            return;
        }

        setLoading((pre) => ({ ...pre, savingProfileDetails: true }));
        setSuccess("");
        setError("");

        const payload = {
            ...data,
            cnic: deformatCnic(data.cnic),
            phoneNumber: data.phoneNumber.replace(/-/g, ""),
            cityId: data.city,
        };
        delete payload?.city;

        const resultAction = await dispatch(updateUserAsync(payload));
        if (updateUserAsync.fulfilled.match(resultAction)) {
            const message = resultAction?.payload?.message || "Profile updated successfully!";
            setSuccess(message);
            toast.success(message);
            setIsEditing(false);
        } else {
            const errorMessage = resultAction?.payload?.message || "Failed to update profile.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
        setSensitiveEdit({ email: false, phoneNumber: false });
        setLoading((pre) => ({ ...pre, savingProfileDetails: false }));
    };

    // Helper function to validate sensitive fields before triggering OTP
    const validateSensitiveFields = () => {
        const currentEmail = getValues("email");
        const currentPhone = getValues("phoneNumber");
        
        // Validate email if it's being edited
        if (sensitiveEdit.email) {
            if (!currentEmail || currentEmail.trim() === "") {
                toast.error("Please enter an email address");
                return false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(currentEmail)) {
                toast.error("Please enter a valid email address");
                return false;
            }
        }
        
        // Validate phone number if it's being edited
        if (sensitiveEdit.phoneNumber) {
            if (!currentPhone || currentPhone.trim() === "") {
                toast.error("Please enter a phone number");
                return false;
            }
            const phoneRegex = /^(\d{4})-(\d{7})$/;
            if (!phoneRegex.test(currentPhone)) {
                toast.error("Phone number must follow format 03xx-xxxxxxx");
                return false;
            }
        }
        
        return true;
    };

    const handleOtpConfirm = async (otp) => {
        setLoading((pre) => ({ ...pre, savingSensitiveFeilds: true }));
        const sensitivePayload = {};
        if (sensitiveEdit.email) sensitivePayload.email = getValues("email");
        if (sensitiveEdit.phoneNumber) {
            sensitivePayload.phoneNumber = getValues("phoneNumber").replace(/-/g, "");
        }

        const resultAction = await dispatch(updateUserSensitiveFieldsAsync({
            ...sensitivePayload,
            otp
        }));
        
        setLoading((pre) => ({ ...pre, savingSensitiveFeilds: false }));
        if (updateUserSensitiveFieldsAsync.fulfilled.match(resultAction)) {
            const message = resultAction?.payload?.message || "Profile updated successfully!";
            setSuccess(message);
            setError("")
            toast.success(message);
            setSensitiveEdit({ email: false, phoneNumber: false, isOpenOtpModal: false });
        } else {
            const errorMessage = resultAction?.payload?.message || "Failed to update profile.";
            setError(errorMessage);
            toast.error(errorMessage);
        }

    };

    return (
        <div className="sm:min-h-screen w-full flex justify-center items-center p-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profile - Anti-Corruption Establishment Sindh</title>
                <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
            </Helmet>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid sm:grid-cols-2 gap-2 border profile-form rounded-md w-full bg-white shadow-md p-4 max-md:shadow-none max-md:border-none max-sm:p-2"
                >
                    <div className="col-span-2 p-3 bg-green-50 border border-green-200 rounded-md sm:text-sm text-xs text-green-800 flex items-start gap-2">
                        <Info className="sm:block hidden" />
                        <p>
                            You can freely update your profile information.
                            For security reasons, changes to your <strong>Email</strong> or <strong>Phone Number</strong> require verification via a one-time password (OTP).
                            Click the <Lock className="inline-block sm:w-4 sm:h-4 h-2 w-2 mx-1" /> icon next to these fields to unlock them and request a change.
                        </p>
                    </div>
                    <div className="flex justify-between col-span-2 flex-wrap ">
                        <h3 className="text-2xl mb-2 font-bold col-span-2">Profile Information</h3>
                        {canChangeProfileImage &&
                        <div className="relative ml-auto">
                            <ChangeProfileImage />
                            </div>
                        }
                    </div>
                    

                    <TextField
                        label="Full Name"
                        error={errors.fullName?.message}
                        {...register("fullName",{
                            onChange: (e) => {
                                const formatted = formatCharacterOnlyInput(e.target.value);
                                setValue("fullName", formatted, { shouldValidate: true });
                            },
                        })}
                        disabled={!isEditing || !canEditProfile}
                        isValid={!!watch("fullName") && !errors.fullName}
                    />

                    <TextField
                        label="CNIC"
                        error={errors.cnic?.message}
                        {...register("cnic", {
                            onChange: (e) => {
                                setValue("cnic", formatCNICInput(e.target.value), { shouldValidate: true });
                            },
                        })}
                        disabled
                        isValid={!!watch("cnic") && !errors.cnic}
                    />

                    <div className="flex items-center gap-2 max-md:col-span-2">
                        <TextField
                            label="Email (Optional)"
                            error={errors.email?.message}
                            {...register("email")}
                            isValid={!!watch("email") && !errors.email}
                            disabled={!canEditProfile || !sensitiveEdit.email}
                        />
                        {canEditProfile && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className={`${isEditing ? "hidden" : ""}`}
                                title={sensitiveEdit.email
                                    ? "Click to confirm and request OTP"
                                    : "Click to unlock and edit email"}
                                onClick={() => {
                                    if (!sensitiveEdit.email) {
                                        // Unlock
                                        setSensitiveEdit(prev => ({ ...prev, email: true }));
                                    } else {
                                        // Check if email has changed and is not empty
                                        const currentEmail = getValues("email");
                                        const originalEmail = user?.email || "";
                                        
                                        if (currentEmail === originalEmail) {
                                            toast.info("Email is the same as before. No changes to save.");
                                            setSensitiveEdit(prev => ({ ...prev, email: false }));
                                            return;
                                        }
                                        
                                        // Validate fields before triggering OTP
                                        if (validateSensitiveFields()) {
                                            // Save sensitive field → trigger OTP
                                            setSensitiveEdit(prev => ({ ...prev, isOpenOtpModal: true }));
                                        }
                                    }
                                }}
                            >
                                {sensitiveEdit.email ? <CheckCheck size={16} /> : <Lock size={16} />}
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 max-md:col-span-2">
                        <TextField
                            label="Mob / WhatsApp"
                            error={errors.phoneNumber?.message}
                            {...register("phoneNumber", {
                                onChange: (e) => {
                                    setValue("phoneNumber", formatPhoneNumberInput(e.target.value), { shouldValidate: true });
                                },
                            })}
                            disabled={!canEditProfile || !sensitiveEdit.phoneNumber}
                            isValid={!!watch("phoneNumber") && !errors.phoneNumber}
                        />
                        {canEditProfile && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className={`${isEditing ? "hidden" : ""}`}
                                onClick={() => {
                                    if (!sensitiveEdit.phoneNumber) {
                                        // Unlock
                                        setSensitiveEdit(prev => ({ ...prev, phoneNumber: true }));
                                    } else {
                                        // Check if phone number has changed and is not empty
                                        const currentPhone = getValues("phoneNumber");
                                        const originalPhone = formatMobileNumber(user?.phoneNumber || "");
                                        
                                        if (currentPhone === originalPhone) {
                                            toast.info("Phone number is the same as before. No changes to save.");
                                            setSensitiveEdit(prev => ({ ...prev, phoneNumber: false }));
                                            return;
                                        }
                                        
                                        // Validate fields before triggering OTP
                                        if (validateSensitiveFields()) {
                                            // Save sensitive field → trigger OTP
                                            setSensitiveEdit(prev => ({ ...prev, isOpenOtpModal: true }));
                                        }
                                    }
                                }}
                            >
                                {sensitiveEdit.phoneNumber ? <CheckCheck size={16} /> : <Lock size={16} />}
                            </Button>
                        )}
                    </div>

                    <TextField
                        label="Address"
                        error={errors.address?.message}
                        {...register("address")}
                        disabled={!isEditing || !canEditProfile}
                        wrapperClass="w-full col-span-2"
                        isValid={!!watch("address") && !errors.address}
                    />

                    <div className="col-span-2 grid grid-cols-1 gap-2">
                        <ComboboxField
                            name="city"
                            label="City"
                            placeholder={"Select city"}
                            options={cities.data}
                            valueKey="id"        // or whatever your city object key is
                            labelKey="value"      // adjust if cities have a different label field
                            error={errors.city?.message}
                            isLoading={false}
                            disabled={!isEditing || !canEditProfile}
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 col-span-2 flex gap-2 items-center text-sm">
                            <XCircle size={18} /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-600 col-span-2 flex gap-2 items-center text-sm">
                            <CheckCircle size={18} /> {success}
                        </div>
                    )}

                    {!(sensitiveEdit?.email || sensitiveEdit?.phoneNumber) && <div className="flex justify-end col-span-2 mt-6 gap-2">
                        {!isEditing ? (
                            <Button type="button" disabled={!canEditProfile} onClick={(e) => {
                                e.preventDefault();
                                console.log("Button clicked");
                                setIsEditing(true)
                            }} variant="black">
                                Edit Profile
                            </Button>
                        ) : (
                            <Button type="submit" loading={loading?.savingProfileDetails} variant="black">
                                Save Profile
                            </Button>
                        )}
                    </div>}
                </form>
                <OtpPromptModal
                    open={sensitiveEdit.isOpenOtpModal}
                    onClose={() => setSensitiveEdit(prev => ({ ...prev, isOpenOtpModal: false }))}
                    isSubmitting={loading?.savingSensitiveFeilds}
                    onConfirm={handleOtpConfirm}
                    notificationTypes={[
                        ...(sensitiveEdit.phoneNumber ? ["SMS"] : []),
                        ...(sensitiveEdit.email ? ["EMAIL"] : [])
                    ]}
                    metadata={encryptValue(JSON.stringify({// encrypt metadata object and send encrypted string for security purposes
                        email: getValues("email"),
                        phoneNumber: getValues("phoneNumber"),
                    }))}
                />
            </FormProvider>
        </div>
    );
};

export default EditProfilePage;
