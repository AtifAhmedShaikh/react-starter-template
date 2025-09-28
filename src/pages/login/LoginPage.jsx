import { OtpModalWithTimer } from "@/components/reuseable/OtpModel";
import { TextField } from "@/components/reuseable/TextField";
import { Button } from "@/components/ui/button";
import { loginAsync, selectLoadingStatus, setSelectedCharge, setTemporaryValue } from "@/stores/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema } from "../../schema/userSchema";
import { useSelector } from "react-redux";
import ChargeSelectionModal from "@/components/reuseable/ChargeSelectionModal";
import Navbar from "@/components/layouts/Navbar";
import { formatCNICInput } from "@/utils/formatters";
import Footer from "@/components/layouts/Footer";
import { RESPONSE_INTENTS, USER_ROLES } from "@/constants";

const Login = () => {
     const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ||"";
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showOTPModal, setShowOTPModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingStatus = useSelector(selectLoadingStatus);
    const [chargeSelectionModal, setChargeSelectionModal] = useState({ isOpen: false, charges: [] });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "all",
    });

    const onSubmit = async (data) => {
        setSuccess("");
        setError("");

        delete data.rememberMe;
        const resultAction = await dispatch(loginAsync(data));

        if (loginAsync.fulfilled.match(resultAction)) {
            const response = resultAction.payload;

            if (response?.intent === RESPONSE_INTENTS.OTP_SENT) {
                dispatch(setTemporaryValue({ key: "cnic", value: data?.cnic }));
                setShowOTPModal(true);
                reset();
                return null;
            }

            toast.success(response?.message);
            setSuccess(response?.message);
            localStorage.setItem("accessToken", response?.token);

            if (response?.intent === RESPONSE_INTENTS.SINGLE_CHARGE && response?.userCharge) {
                dispatch(setSelectedCharge(response?.userCharge));
                navigate(redirectTo||"/dashboard");
                return;
            }

            if (response?.intent === RESPONSE_INTENTS.MULTIPLE_CHARGES && response.userCharges) {
                console.log("response.userCharges: ", response.userCharges);
                setChargeSelectionModal({ isOpen: true, charges: response.userCharges });
                return;
            }

            if (response?.user?.roleKey == USER_ROLES?.COMPLAINANT) {
                navigate(redirectTo||"/lodge-complaint"); 
            } else {
                navigate(redirectTo||"/dashboard"); // Redirect after login
            }

        } else {
            const errorMessage = resultAction?.payload?.message || "Error while login please try again";
            setError(errorMessage);
            setValue("password", "");
            toast.error(errorMessage);
        }
    };

    const onCofirmOTP = () => {
        navigate("/login");
    }

    return (
        <>
            <Helmet>
                <title>Login - Anti-Corruption Establishment</title>
            </Helmet>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100/50 p-4">
                <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative border-t-primary border-t-5 sm:mt-5 mt-14">
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <Link to="/">
                            <img
                                src={"/ace.png"}
                                alt="ACE Logo"
                                className="w-28 h-28 rounded-full border-2 border-gray-700 shadow-lg bg-white p-0.5"
                            />
                        </Link>
                    </div>

                    <div className="text-center mt-16">
                        <h2 className="text-lg font-semibold text-primary">Welcome to</h2>
                        <h1 className="text-2xl font-bold text-primary">
                            Anti-Corruption Establishment
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <TextField
                            label="CNIC"
                            placeholder="xxxxx-xxxxxxx-x"
                            error={errors.cnic?.message}
                            {...register("cnic", {
                                onChange: (e) => {
                                    const formatted = formatCNICInput(e.target.value);
                                    setValue("cnic", formatted, { shouldValidate: true });
                                }
                            })}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    {...register("rememberMe")}
                                />
                                Remember me
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {error && (
                            <div className="text-red-600 flex gap-2 items-center text-sm">
                                <XCircle size={18} /> {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-green-600 flex gap-2 items-center text-sm">
                                <CheckCircle size={18} /> {success}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="bg-foreground text-background w-full rounded-lg hover:bg-gray-800 transition py-6"
                            loading={loadingStatus == "loading"}
                        >
                            Sign In
                        </Button>

                        <div className="text-center mt-4 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="text-green-700 hover:underline">
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
                <OtpModalWithTimer onConfirmOtp={onCofirmOTP} showOtp={showOTPModal} setShowOtp={setShowOTPModal} showWelcome={true} />
                <ChargeSelectionModal
                    open={chargeSelectionModal.isOpen}
                    onClose={() => setChargeSelectionModal({ isOpen: false, charges: null })}
                    charges={chargeSelectionModal?.charges || []}
                />
            </div>
            <Footer />
        </>
    );
};

export default Login;