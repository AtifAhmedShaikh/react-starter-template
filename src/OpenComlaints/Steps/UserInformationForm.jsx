import ComboboxField from "@/components/reuseable/ComboboxField";
import { LoadingScreen } from "@/components/reuseable/Loading";
import SelectField from "@/components/reuseable/SelectFieldV2";
import { TextField } from "@/components/reuseable/TextField";
import { COUNTRIES } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { fetchCitiesAsync, selectCities, selectCitiesLoading } from "@/stores/slices/metadataSlice";
import { deformatCnic, formatCNICInput, formatMobileNumber, formatPhoneNumberInput } from "@/utils/formatters";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UserInformationForm = () => {
    const [disabledFields, setDisabledFields] = useState(false); // state to disable fields if user already exists with cnic
    const [isAdminAccount, setIsAdminAccount] = useState(false); // state to check if user has admin account
    const [loading, setLoading] = useState(false); // 🔹 loading state for fetching complainant details
    const { register, formState: { errors }, setValue, watch } = useFormContext();
    const dispatch = useDispatch();

    const selectors = {
        cities: useSelector(selectCities),
        citiesLoading: useSelector(selectCitiesLoading),
    };

    const cnicValue = watch("cnic");

    useEffect(() => {
        dispatch(fetchCitiesAsync())
    }, []);


    // Watch CNIC and call API when complete
    useEffect(() => {
        const formattedCNIC = deformatCnic(cnicValue)
        if (formattedCNIC?.length === 13) {
            fetchComplainantAccount(formattedCNIC);
        }
    }, [cnicValue]);


    // Fetch complainant details when user typed cnic
    const fetchComplainantAccount = async (cnic) => {
        setLoading(true);
        const response = await apiHandler(COMPLAINT_APIS.SEARCH_COMPLAINANT_WITH_CNIC, {
            params: { cnic }
        })
        setLoading(false);
        if (!response?.success) {
            toast.error(response?.message);
            setDisabledFields(false);
            setIsAdminAccount(false);
            // clear values
            setValue("email", "");
            setValue("fullName", "");
            setValue("fatherName", "");
            setValue("phoneNumber", "");
            setValue("address", "");
            setValue("cityId", "");
            setValue("country", "");
            setValue("gender", "");
            return;
        }
        const { email = "", fullName = "", fatherName = "", phoneNumber = "", address = "", cityId = "", country = "", gender } = response?.data?.user || {};
        // Fill values
        setValue("email", email);
        setValue("fullName", fullName);
        setValue("fatherName", fatherName);
        setValue("phoneNumber", formatMobileNumber(phoneNumber));
        setValue("address", address);
        setValue("cityId", cityId);
        setValue("country", country);
        setValue("gender", gender);
        // Disable fields
        setDisabledFields(true);
        setIsAdminAccount(response?.data?.isAdminUser);
    };

    return (
        <div className="sm:p-5 p-4 shadow-md rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Complaint By</h2>
            <div className="min-h-8">
                {loading && (
                    <div className="text-xs flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        Fetching complainant details...
                    </div>
                )}
                {isAdminAccount ? (
                    <p className="text-red-600 font-semibold">
                        🚨 Warning: The CNIC provided is associated with an Admin account. Submitting a complaint using an Admin CNIC is a sensitive action. Please ensure the CNIC is correct and proceed with caution.
                    </p>
                ) : disabledFields ? (
                    <p className="text-primary">
                        ✅ Complainant account already exists with this CNIC. Please proceed to the next step.
                    </p>
                ) : (
                    <p className="text-red-400">
                        Please fill out the following form with your complainant details.
                    </p>
                )}

            </div>
            {/* 🔹 Loader */}
            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <TextField label="CNIC"  {...register("cnic", {
                    onChange: (e) => {
                        const formatted = formatCNICInput(e.target.value);
                        setValue("cnic", formatted, { shouldValidate: true });
                    },
                })}
                    placeholder="Enter complainant CNIC (without dashes)" error={errors.cnic?.message}
                />
                <TextField label="Full Name" placeholder="Enter complainant full name" {...register("fullName")} error={errors.fullName?.message} disabled={disabledFields || loading} />
                <TextField label="Father Name" placeholder="Enter complainant father name" {...register("fatherName")} error={errors.fatherName?.message} disabled={disabledFields || loading} />
                <TextField label="Email" {...register("email")} placeholder="Enter complainant email address" error={errors.email?.message} disabled={disabledFields || loading} />
                <TextField label="Phone Number"  {...register("phoneNumber", {
                    onChange: (e) => {
                        const formatted = formatPhoneNumberInput(e.target.value);
                        setValue("phoneNumber", formatted, { shouldValidate: true });
                    },
                })}
                    placeholder="Enter complainant phone number" error={errors.phoneNumber?.message}
                    disabled={disabledFields || loading}
                />
                <TextField label="Address" {...register("address")} placeholder="Enter complainant address" error={errors.address?.message} disabled={disabledFields || loading} />
                <SelectField label="Gender"
                    options={[
                        { id: "MALE", value: "Male" },
                        { id: "FEMALE", value: "Female" }
                    ]}
                    error={errors.gender?.message}
                    placeholder="Select Gender"
                    name={"gender"}
                    isLoading={false}
                    disabled={disabledFields || loading}
                    className={"!py-2"}
                />
                <ComboboxField
                    name="cityId"
                    label="City"
                    placeholder={"Select city"}
                    options={selectors.cities}
                    valueKey="id"
                    labelKey="name"
                    error={errors.cityId?.message}
                    isLoading={selectors.citiesLoading}
                    disabled={disabledFields || loading}
                />
                <ComboboxField
                    name="country"
                    label="Country"
                    placeholder={"Select Country"}
                    options={COUNTRIES}
                    valueKey="id"
                    labelKey="value"
                    error={errors.country?.message}
                    isLoading={false}
                    disabled={disabledFields || loading}
                />
            </div>
        </div>
    );
};

export default UserInformationForm;