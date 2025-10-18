import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { ResetPasswordOtpModal } from "@/components/reuseable/ResetPasswordOtpMode";
import { TextField } from "@/components/reuseable/TextField";
import { LogoImage } from "@/components/ui/image-variants";
import { RESPONSE_INTENTS } from "@/constants";
import { AUTH_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { formatCNICInput } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/utils/toastUtils";
import { forgotPasswordSchema } from "../../schema/userSchema";

const ForgotPasswordPage = () => {
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [cnic, setCnic] = useState("");
    const navigate = useNavigate();

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
        const response = await apiHandler(AUTH_APIS.FORGOT_PASSWORD, {
            method: "POST",
            data,
        });

        if (response.success && response.data?.intent === RESPONSE_INTENTS.OTP_SENT) {
            showToast.success(response.message);
            setShowOTPModal(true);
            setCnic(data?.cnic);
            return;
        } else {
            showToast.error(response.message || "Something went wrong during OTP request.");
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

            <div className="min-h-screen flex items-center justify-center bg-muted p-4 ">
                <div className="bg-card rounded-2xl shadow-xl max-w-xl w-full p-6 relative border-t-primary border-t-5" >
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <Link to="/">
                            <LogoImage
                                src="logo.png"
                                alt="ACE Logo"
                                className="w-28 h-28 rounded-full border-1 border-border shadow-lg bg-card p-0.5"
                            />
                        </Link>
                    </div>

                    <div className="text-center mt-16">
                        <h2 className="text-2xl font-semibold">Forgot Password</h2>
                        <p className="txt-sm text-muted-foreground mt-1">
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

                        <button
                            type="submit"
                            className="bg-foreground text-background w-full py-2 rounded-lg hover:bg-foreground/90 transition"
                        >
                            Forgot Password
                        </button>
                    </form>
                </div>
            </div>
            <ResetPasswordOtpModal showOtp={showOTPModal} setShowOtp={setShowOTPModal} onConfirmOTP={onConfirmOTP} cnic={cnic} />
            <Footer />
        </>
    );
};

export default ForgotPasswordPage;
