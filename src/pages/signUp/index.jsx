import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import SearchableSelectField from "@/components/reuseable/SearchableSelectField";
import SelectField from "@/components/reuseable/SelectField";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { LogoImage } from "@/components/ui/image-variants";
import { HTTP_METHODS, RESPONSE_INTENTS } from "@/constants";
import { AUTH_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";
import { formatCNICInput, formatPhoneNumberInput } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userRegisterSchema } from "../../schema/userSchema";
import { OtpModalWithTimer } from "@/components/reuseable/OtpModel";
import { setTemporaryValue } from "@/stores/slices/authSlice";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cities = useSelector(selectCities);

    useEffect(() => {
        dispatch(fetchCitiesAsync());
    }, []);

    const formContext = useForm({
        resolver: yupResolver(userRegisterSchema),
        mode: "all",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = formContext;

    const onSubmit = async (data) => {
        setLoading(true);
        const response = await apiHandler(AUTH_APIS.REGISTER_USER, {
            method: HTTP_METHODS.POST,
            data,
        });
        setLoading(false);

        if (!response.success) {
            toast.error(response.message);
            return;
        }
       toast.success(response.message);
       reset();
        if(response.data?.intent === RESPONSE_INTENTS.OTP_SENT){
            setShowOTPModal(true);
            dispatch(setTemporaryValue({ key: "cnic", value: data?.cnic }));
        }
    };

    const onConfirmOTP = () => {
        navigate("/login");
    };

    return (
        <>
            <Helmet>
                <title>Register - Application</title>
            </Helmet>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100/50 p-4">
                <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative border-t-primary border-t-5 sm:mt-5 mt-14">
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <Link to="/">
                            <LogoImage
                                src="logo.png"
                                alt="App Logo"
                                className="w-28 h-28 rounded-full border-2 border-gray-700 shadow-lg bg-white p-0.5"
                            />
                        </Link>
                    </div>

                    <div className="text-center mt-16">
                        <h2 className="text-lg font-semibold text-primary">Create Account</h2>
                        <h1 className="text-2xl font-bold text-primary">Application</h1>
                        <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
                    </div>

                    <FormProvider {...formContext}>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                            <TextField
                                label="Full Name"
                                placeholder="Enter your full name"
                                error={errors.fullName?.message}
                                {...register("fullName")}
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

                            <TextField
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                error={errors.email?.message}
                                {...register("email")}
                            />
                            <TextField
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                error={errors.phoneNumber?.message}
                                {...register("phoneNumber", {
                                    onChange: (e) => {
                                        const formatted = formatPhoneNumberInput(e.target.value);
                                        setValue("phoneNumber", formatted, { shouldValidate: true });
                                    },
                                })}
                            />
                            <SelectField
                                label="Gender"
                                options={[
                                    { id: "MALE", value: "Male" },
                                    { id: "FEMALE", value: "Female" },
                                ]}
                                {...register("gender")}
                            />

                            <SearchableSelectField
                                name="cityId"
                                label="City"
                                placeholder="Select City"
                                options={cities?.data || []}
                                valueKey="id"
                                labelKey="value"
                                error={errors.cityId?.message}
                                isLoading={cities?.loading}
                                disabled={cities?.loading}
                                className={"!py-2"}
                            />

                            <TextField
                                label="Address"
                                placeholder="Enter your address"
                                error={errors.address?.message}
                                {...register("address")}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password")}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.confirmPassword?.message}
                                {...register("confirmPassword")}
                            />

                            <Button
                                type="submit"
                                className="bg-foreground text-background w-full rounded-lg hover:bg-gray-800 transition py-6"
                                loading={loading}
                                loadingLabel="Creating Account"
                            >
                                Create Account
                            </Button>

                            <div className="text-center mt-4 text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-green-700 hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
            <Footer />
            <OtpModalWithTimer onConfirmOtp={onConfirmOTP} showOtp={showOTPModal} setShowOtp={setShowOTPModal} />

        </>
    );
};

export default SignUp;
