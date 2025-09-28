import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { OTP_TIMER } from "@/constants";
import { resetPasswordSchema } from "@/schema/userSchema";
import { resetPasswordAsync } from "@/stores/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { TextField } from "./TextField";


export function ResetPasswordOtpModal({ showOtp, setShowOtp, onConfirmOTP,  }) {
    const cnic = useSelector((state) => state.auth?.temporaryStorage?.cnic);
    const [submitStatus, setSubmitStatus] = useState({});
    const dispatch = useDispatch();

    const [timer, setTimer] = useState(OTP_TIMER);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: {
            otp: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const otpValue = watch("otp");

    useEffect(() => {
        if (showOtp) {
            // Reset form when modal opens
            reset();
            setTimer(OTP_TIMER);
            const interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [showOtp, reset]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setSubmitStatus({});

            delete data?.confirmPassword;
            const resultAction = await dispatch(resetPasswordAsync({ cnic,  password: data.newPassword, otp: data.otp }));
            setIsLoading(false);
            if (resetPasswordAsync.fulfilled.match(resultAction)) {
                const response = resultAction.payload;
                setShowOtp(false);
                toast.success(response?.message || "OTP verified successfully");
                onConfirmOTP?.();
                setSubmitStatus({ success: response?.message || "OTP verified successfully" });
            } else {
                const errorMessage =
                    resultAction?.payload?.message || "Invalid OTP. Please try again.";
                setSubmitStatus({ error: errorMessage });
                toast.error(errorMessage);
            }
        } catch (err) {
            toast.error(err.message || "Something went wrong during password reset.");
            setSubmitStatus({ error: err.message || "Something went wrong during password reset" });
        }

    };

    return (
        <Dialog open={showOtp}  >
            <DialogContent showCloseButton={false}>
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-center">Reset Your Password</DialogTitle>
                    
                    <div className="text-center text-gray-600 text-sm mb-2">
                        <p>We have sent a 6-digit OTP to your registered email address and mobile number.</p>
                        <p className="mt-1">Please check both your <strong>email</strong> and <strong>SMS</strong> for the verification code.</p>
                    </div>
                    
                    <div className="text-red-500 sm:text-sm mt-4">
                        {timer > 0 ? `Time remaining: ${formatTime(timer)}` : "OTP has expired."}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={otpValue}
                                onChange={(value) => {
                                    const cleanValue = value.replace(/\D/g, "");
                                    setValue("otp", cleanValue);
                                    // Clear OTP error when user starts typing
                                    if (cleanValue.length > 0) {
                                        clearErrors("otp");
                                    }
                                    // Trigger validation when OTP is complete
                                    if (cleanValue.length === 6) {
                                        trigger("otp");
                                    }
                                }}
                            >
                                <InputOTPGroup>
                                    {[...Array(6)].map((_, index) => (
                                        <InputOTPSlot key={index} className="p-6 text-2xl" index={index} />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        {errors.otp && <p className="text-center text-red-500">{errors.otp.message}</p>}

                        <TextField
                            error={errors?.newPassword?.message}
                            label="New Password"
                            type="password"
                            {...register("newPassword", {
                                onChange: (e) => {
                                    if (e.target.value.length > 0) {
                                        clearErrors("newPassword");
                                    }
                                }
                            })}
                            className="w-full p-2"
                            placeholder="Enter your new password"
                        />

                        <TextField
                            error={errors?.confirmPassword?.message}
                            label="Confirm Password"
                            type="password"
                            {...register("confirmPassword", {
                                onChange: (e) => {
                                    if (e.target.value.length > 0) {
                                        clearErrors("confirmPassword");
                                    }
                                }
                            })}
                            className="w-full"
                            placeholder="Enter confirm password"
                        />
                        {submitStatus.error && <p className="text-red-500">{submitStatus.error}</p>}
                        {submitStatus.success && <p className="text-green-600">{submitStatus.success}</p>}

                        <Button className="w-full bg-gray-800 text-white py-2" disabled={isLoading}>
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
