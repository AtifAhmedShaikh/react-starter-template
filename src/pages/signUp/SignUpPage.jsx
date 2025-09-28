import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import ComboboxField from "@/components/reuseable/ComboboxField";
import { OtpModalWithTimer } from "@/components/reuseable/OtpModel";
import SelectField from "@/components/reuseable/SelectFieldV2";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/constants";
import { registerUserAsync, selectLoadingStatus, setTemporaryValue } from "@/stores/slices/authSlice";
import { fetchCitiesAsync, selectCities, selectCitiesLoading } from "@/stores/slices/metadataSlice";
import { formatCNICInput, formatPhoneNumberInput, formatCharacterOnlyInput, formatEmailInput } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userRegiserSchema } from "../../schema/userSchema";

export default function SignUpPage() {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showOTPModal, setShowOTPModal] = useState(false)
    const cities = useSelector(selectCities);
    const loading = useSelector(selectCitiesLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const methods = useForm({ resolver: yupResolver(userRegiserSchema), mode: "all" });
    const registerLoading = useSelector(selectLoadingStatus);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = methods;

    useEffect(() => {
        if (!loading && (!cities || cities.length === 0)) {
            dispatch(fetchCitiesAsync());
        }
    },
        []);

    const onSubmit = async (data) => {
        setSuccess("");
        setError("");

        const { city, ...restData } = data;

        try {
            const resultAction = await dispatch(registerUserAsync({ ...restData, cityId: city }));

            if (registerUserAsync.fulfilled.match(resultAction)) {
                const response = resultAction.payload;
                const INTENT = response?.data?.intent;

                if (INTENT === "OTP_SENT") {
                    setShowOTPModal(true);
                    dispatch(setTemporaryValue({ key: "cnic", value: data?.cnic }));
                    return;
                }

                toast.success(response?.message || "Registration successful");
                setSuccess("Registration successful");
            } else {
                const errorMessage =
                    resultAction?.payload?.message || "Something went wrong during registration.";
                toast.error(errorMessage);
                setError(errorMessage);
            }
        } catch (err) {
            toast.error(err.message || "Unexpected error");
            setError(err.message || "Unexpected error");
        }
    };


    const onCofirmOTP = () => {
        navigate("/login");
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Helmet>
                    <title>Register - Anti-Corruption Establishment</title>
                </Helmet>

                <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 relative mt-20 border-t-primary border-t-5">
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <img
                            src={"/ace.png"}
                            alt="ACE Logo"
                            className="w-28 h-28 rounded-full border-3 border-gray-700 shadow-lg bg-white p-0.5"
                        />
                    </div>

                    <div className="text-center mt-16 text-primary">
                        <h2 className="text-2xl font-semibold">Welcome to</h2>
                        <h1 className="text-3xl font-bold ">
                            Anti-Corruption Establishment
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Sign Up and Take the First Step
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <TextField 
                                    label="Name" 
                                    placeholder="Your full name" 
                                    error={errors.fullName?.message} 
                                    {...register("fullName", {
                                        onChange: (e) => {
                                            const formatted = formatCharacterOnlyInput(e.target.value);
                                            setValue("fullName", formatted, { shouldValidate: true });
                                        },
                                    })} 
                                />
                                <TextField 
                                    label="Father's Name" 
                                    placeholder="Father's name" 
                                    error={errors.fatherName?.message} 
                                    {...register("fatherName", {
                                        onChange: (e) => {
                                            const formatted = formatCharacterOnlyInput(e.target.value);
                                            setValue("fatherName", formatted, { shouldValidate: true });
                                        },
                                    })} 
                                />
                                <TextField
                                    label="CNIC"
                                    placeholder="xxxxx-xxxxxxx-x"
                                    error={errors.cnic?.message}
                                    {...register("cnic", {
                                        onChange: (e) => {
                                            const formatted = formatCNICInput(e.target.value);
                                            setValue("cnic", formatted, { shouldValidate: true });
                                        },
                                    })}
                                />

                                <TextField label="Email (Optional)" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
                                <TextField
                                    label="Mobile Number"
                                    placeholder="03xx-xxxxxxx"
                                    error={errors.phoneNumber?.message}
                                    {...register("phoneNumber", {
                                        onChange: (e) => {
                                            const formatted = formatPhoneNumberInput(e.target.value);
                                            setValue("phoneNumber", formatted, { shouldValidate: true });
                                        },
                                    })}
                                />
                                <SelectField label="Gender"
                                    options={[
                                        { id: "MALE", value: "Male" },
                                        { id: "FEMALE", value: "Female" }
                                    ]}
                                    error={errors.gender?.message}
                                    placeholder="Select Gender"
                                    name={"gender"}
                                    isLoading={false}
                                />
                            </div>

                            <TextField label="Address" placeholder="Enter your address" error={errors.address?.message} {...register("address")} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ComboboxField
                                    name="city"
                                    label="City"
                                    placeholder={"Select city"}
                                    options={cities}
                                    valueKey="id"        // or whatever your city object key is
                                    labelKey="name"      // adjust if cities have a different label field
                                    error={errors.city?.message}
                                    isLoading={loading}
                                />
                                <ComboboxField
                                    name="country"
                                    label="Country"
                                    options={COUNTRIES}
                                    valueKey="id"
                                    labelKey="value"
                                    error={errors.country?.message}
                                    isLoading={false}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
                                <TextField label="Confirm Password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
                            </div>

                            {error && <div className="text-red-600 flex gap-2 items-center text-sm"><XCircle size={18} />{error}</div>}
                            {success && <div className="text-green-600 flex gap-2 items-center text-sm"><CheckCircle size={18} />{success}</div>}

                            <Button
                                type="submit"
                                className="bg-black text-background w-full py-6 hover:bg-gray-800 transition rounded-lg"
                                loading={registerLoading == "loading"}
                            >
                                Submit
                            </Button>

                            <div className="text-center mt-4 text-sm">
                                Already have an account? <Link to="/login" className="text-green-700 hover:underline">Sign In</Link>
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <OtpModalWithTimer onConfirmOtp={onCofirmOTP} showOtp={showOTPModal} setShowOtp={setShowOTPModal} />
            </div>
            <Footer/>
            </>
    );
}