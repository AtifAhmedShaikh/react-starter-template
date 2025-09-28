"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { OTP_TIMER } from "@/constants";
import { resendOtpAsync, verifyAccountAsync } from "@/stores/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";

export function OtpModalWithTimer({ showOtp, setShowOtp, onConfirmOtp,showWelcome=false }) {
    const [otp, setOtp] = useState("");
    const [submitStatus, setSubmitStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(OTP_TIMER);
    const cnic = useSelector((state) => state.auth?.temporaryStorage?.cnic);
    const dispatch = useDispatch()

    useEffect(() => {
        if (showOtp) {
            setTimer(OTP_TIMER);
            const interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [showOtp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleOtp = async (cnic, userOTP) => {
        if (!userOTP || userOTP.length !== 6) return;

        setIsLoading(true);
        setSubmitStatus({});

        const resultAction = await dispatch(verifyAccountAsync({ cnic, otp: userOTP }));
        setIsLoading(false);

        if (verifyAccountAsync.fulfilled.match(resultAction)) {
            const response = resultAction.payload;
            setShowOtp(false);

            toast.success(response?.message || "OTP verified successfully");
            if(showWelcome){
                Swal.fire({
                    icon:"success",
                    title:"Welcome back",
                    text:"your account has been verified please login again to continue!"
                })
            }
            // Optional: Trigger navigation or callback here
            onConfirmOtp?.();
        } else {
            const errorMessage =
                resultAction?.payload?.message || "Invalid OTP. Please try again.";
            setSubmitStatus({ error: errorMessage });
            setIsLoading(false);
            toast.error(errorMessage);
        }
    };


    const handleResendButton = async () => {
        try {
            setIsLoading(true);
            setSubmitStatus({});
            setOtp("");

            const resultAction = await dispatch(resendOtpAsync({ cnic }));
            setIsLoading(false)
            if (resendOtpAsync.fulfilled.match(resultAction)) {
                const response = resultAction.payload;
                const INTENT = response?.data?.intent;

                if (INTENT === "OTP_RESENT") {
                    setTimer(OTP_TIMER);
                    toast.success(response?.message || "OTP resent successfully");
                    return;
                }

                toast.success(response?.message || "OTP resent successfully");
            } else {
                const errorMessage =
                    resultAction?.payload?.message || "Something went wrong during OTP resend.";
                toast.error(errorMessage);
                setSubmitStatus({ error: errorMessage });
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong during OTP resend.");
            setIsLoading(false);
            setSubmitStatus({ error: "Something went wrong during OTP resend." });
        }

    };


    return (
        <Dialog open={showOtp}>
            <DialogContent showCloseButton={true}>
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-center">Enter your OTP</DialogTitle>

                    <div className="flex justify-between items-center text-lg">
                        <div className="text-red-500 sm:text-sm text-xs mt-4">
                            {timer > 0 ? `Time remaining: ${formatTime(timer)}` : "OTP has expired."}
                        </div>
                        <Button disabled={timer > 0} onClick={handleResendButton}>
                            Resend OTP
                        </Button>
                    </div>

                    <div className="flex flex-col gap-6 justify-center items-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => {
                                setOtp(value.replace(/\D/g, ""));
                                if (value.length === 6) {
                                    handleOtp(cnic, value);
                                }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleOtp(cnic, otp)}
                        >
                            <InputOTPGroup>
                                {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot key={index} className="p-6 text-2xl" index={index} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <div className="min-h-4">
                        {submitStatus.error && <p className="text-red-500">{submitStatus.error}</p>}
                        {submitStatus.success && <p className="text-green-600">{submitStatus.success}</p>}
                    </div>

                    <Button
                        className="w-full bg-gray-800 px-2 text-white rounded-md py-2 hover:bg-black"
                        disabled={isLoading || otp.length !== 6 || timer === 0}
                        onClick={() => handleOtp(cnic, otp)}
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
