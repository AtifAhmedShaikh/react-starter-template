import ComboboxField from "@/components/reuseable/SearchableSelectField";
import { TextField } from "@/components/reuseable/TextField";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { selectUser } from "@/stores/slices/authSlice";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const UserInformationForm = () => {
    const { hasPermission } = usePermissions()
    const { register, formState: { errors } } = useFormContext();
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    const isPreFilled = !hasPermission(PermissionKeys.edit_user_info_on_lodged_complaint) // If have this permission, so user can edit user info while lodged complaint
    const selectors = {
        cities: useSelector(selectCities),
        citiesLoading:false,
    };

    useEffect(() => {
        dispatch(fetchCitiesAsync())
    }, []);


    return (
        <div className="sm:p-5 p-4 shadow-md rounded-lg border">
            {/* Show message if city is missing and user can't edit */}
            {isPreFilled && !user?.cityId && errors?.cityId && (
                <div className="animate-pulse duration-500 rounded-md p-3 mb-4">
                    <p className="text-sm text-yellow-600 mt-1">
                        Please update your city from the <span className="font-medium">Profile</span> tab before submitting the complaint.
                    </p>
                    <p className="text-sm text-right text-yellow-600 mt-1 font-nastaliq" dir="rtl">
                        آپ کا شہر منتخب نہیں ہے۔ برائے مہربانی پہلے   <span className="text-right">"Edit Profile"</span>  میں جا کر شہر کا انتخاب کریں۔
                    </p>
                </div>
            )}
            <h2 className="text-lg font-semibold mb-4">Complaint By</h2>
            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <TextField label="Full Name" disabled={isPreFilled} defaultValue={user.fullName} {...register("fullName")} error={errors.fullName?.message} />
                <TextField label="CNIC" disabled={isPreFilled} defaultValue={user.cnic} {...register("cnic")} error={errors.cnic?.message} />
                <TextField label="Email" disabled={isPreFilled} defaultValue={user.email} {...register("email")} error={errors.email?.message} />
                <TextField label="Phone Number" disabled={isPreFilled} defaultValue={user.phoneNumber} {...register("phoneNumber")} error={errors.phoneNumber?.message} />
                <TextField label="Address" disabled={isPreFilled} {...register("address")} error={errors.address?.message} />
                <ComboboxField
                    name="cityId"
                    label="City"
                    placeholder={"Select city"}
                    options={selectors.cities}
                    disabled
                    valueKey="id"
                    labelKey="name"
                    error={errors.cityId?.message}
                    isLoading={selectors.citiesLoading}
                />
            </div>
        </div>
    );
};

export default UserInformationForm;