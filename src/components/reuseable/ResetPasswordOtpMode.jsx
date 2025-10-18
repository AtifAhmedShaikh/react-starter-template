import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AUTH_APIS } from "@/constants/APIs";
import { OTP_TIMER } from "@/constants";
import { apiHandler } from "@/lib/apiWrapper";
import { resetPasswordSchema } from "@/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toastUtils";
import { TextField } from "./TextField";


export function ResetPasswordOtpModal({ showOtp, setShowOtp, onConfirmOTP, cnic }) {
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
        setIsLoading(true);

        delete data?.confirmPassword;
        
        const response = await apiHandler(AUTH_APIS.RESET_PASSWORD, {
            method: "POST",
            data: { cnic, password: data.newPassword, otp: data.otp },
        });

        setIsLoading(false);

        if (response.success) {
            setShowOtp(false);
            showToast.success(response.message || "OTP verified successfully");
            onConfirmOTP?.();
        } else {
            showToast.error(response.message || "Invalid OTP. Please try again.");
        }
    };

    return (
        <Dialog open={showOtp}  >
            <DialogContent showCloseButton={false}>
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-center">Reset Your Password</DialogTitle>
                    
                    <div className="text-center text-muted-foreground text-sm mb-2">
                        <p>We have sent a 6-digit OTP to your registered email address and mobile number.</p>
                        <p className="mt-1">Please check both your <strong>email</strong> and <strong>SMS</strong> for the verification code.</p>
                    </div>
                    
                    <div className="text-destructive sm:text-sm mt-4">
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
                        {errors.otp && <p className="text-center text-destructive">{errors.otp.message}</p>}

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

                        <Button className="w-full bg-foreground text-background py-2" loading={isLoading} loadingLabel="Resetting...">
                            Reset Password
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
