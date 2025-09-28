import { ResetPasswordOtpModal } from "@/components/reuseable/ResetPasswordOtpMode";
import { TextField } from "@/components/reuseable/TextField";
import { forgotPasswordAsync, selectLoadingStatus, setTemporaryValue } from "@/stores/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { forgotPasswordSchema } from "../../schema/userSchema";
import { useSelector } from "react-redux";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { formatCNICInput } from "@/utils/formatters";

const ForgotPasswordPage = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showOTPModal, setShowOTPModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingStatus = useSelector(selectLoadingStatus);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "all",
    });

    const onSubmit = async (data) => {
        setSuccess("");
        setError("");

        const resultAction = await dispatch(forgotPasswordAsync(data));

        if (forgotPasswordAsync.fulfilled.match(resultAction)) {
            const response = resultAction.payload;
            console.log("Response", response)
            const INTENT = response?.data?.intent;

            console.log("INTENT", INTENT)

            if (INTENT === "OTP_SENT") {
                setSuccess(response?.message);
                toast.success(response?.message);
                setShowOTPModal(true)
                dispatch(setTemporaryValue({ key: "cnic", value: data?.cnic }));
                return;
            }

            toast.success(response?.message || "OTP sent successfully");
            setSuccess(response?.message || "OTP sent successfully");
        } else {
            const errorMessage =
                resultAction?.payload?.message || "Something went wrong during OTP request.";
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    const onConfirmOTP = () => {
        navigate("/login");
    };

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Forgot Password - Anti-Corruption Establishment</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 ">
                <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 relative border-t-primary border-t-5" >
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <Link to="/">
                            <img
                                src={"/ace.png"}
                                alt="ACE Logo"
                                className="w-28 h-28 rounded-full border-1 border-gray-700 shadow-lg bg-white p-0.5"
                            />
                        </Link>
                    </div>

                    <div className="text-center mt-16">
                        <h2 className="text-2xl font-semibold">Forgot Password</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Enter Your CNIC to Reset Your Password
                        </p>
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
                                },
                            })}
                        />
                        <div className="flex justify-between mt-4 mb-2">
                            <div className="form-group form-check flex items-center p-0">
                                <label className="!mb-0 " htmlFor="rememberMe">
                                    Remember your password?
                                </label>
                            </div>
                            <Link
                                to="/login"
                                className="text-primary focus:text-primary hover:text-primary"
                            >
                                Login
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

                        <button
                            type="submit"
                            className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition"
                            loading={loadingStatus == "loading"}
                        >
                            Forgot Password
                        </button>
                    </form>
                </div>
            </div>
            <ResetPasswordOtpModal showOtp={showOTPModal} setShowOtp={setShowOTPModal} onConfirmOTP={onConfirmOTP} />
            <Footer />
        </>
    );
};

export default ForgotPasswordPage;
