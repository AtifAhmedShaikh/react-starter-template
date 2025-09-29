"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { HTTP_METHODS, OTP_TIMER } from "@/constants";
import { AUTH_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";

export function OtpModalWithTimer({ showOtp, setShowOtp, onConfirmOtp, showWelcome = false }) {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(OTP_TIMER);

    const cnic = useSelector((state) => state.auth?.temporaryStorage?.cnic);

    // Timer setup
    useEffect(() => {
        let interval;
        if (showOtp) {
            setTimer(OTP_TIMER);
            setOtp(""); // Clear OTP on modal open
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) clearInterval(interval);
                    return prev > 0 ? prev - 1 : 0;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOtp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleOtp = async (cnic, userOTP) => {
        if (!userOTP || userOTP.length !== 6 || isLoading) return;

        setIsLoading(true);
        const response = await apiHandler(AUTH_APIS.VERIFY_ACCOUNT, {
            method: HTTP_METHODS.POST,
            data: { cnic, otp: userOTP },
        });
        setIsLoading(false);

        if (!response.success) {
            toast.error(response.message || "Invalid OTP. Please try again.");
            return;
        }

        toast.success(response.message || "OTP verified successfully");
        setShowOtp(false); // Close modal

        if (showWelcome) {
            Swal.fire({
                icon: "success",
                title: "Welcome back",
                text: "Your account has been verified. Please login again to continue!",
            });
        }

        if (typeof onConfirmOtp === "function") {
            onConfirmOtp();
        }
    };

    const handleResendButton = async () => {
        if (timer > 0 || isResending) return; // Prevent if still waiting or already resending

        setIsResending(true);
        const response = await apiHandler(AUTH_APIS.RESEND_OTP, {
            method: HTTP_METHODS.POST,
            data: { cnic },
        });
        setIsResending(false);

        if (!response.success) {
            return toast.error(response.message || "Failed to resend OTP.");
        }

        toast.success(response.message || "OTP resent successfully.");
        setTimer(OTP_TIMER); // Restart timer
        setOtp(""); // Clear OTP input
    };

    const handleChange = (value) => {
        const sanitized = value.replace(/\D/g, "");
        setOtp(sanitized);

        if (sanitized.length === 6) {
            handleOtp(cnic, sanitized);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && otp.length === 6 && !isLoading) {
            handleOtp(cnic, otp);
        }
    };

    return (
        <Dialog open={showOtp} onOpenChange={setShowOtp}>
            <DialogContent showCloseButton={false}>
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-center">Enter your OTP</DialogTitle>

                    <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-red-500">
                            {timer > 0 ? `Time remaining: ${formatTime(timer)}` : "OTP has expired."}
                        </span>
                        <Button
                            size="sm"
                            onClick={handleResendButton}
                            disabled={timer > 0 || isResending}
                            loading={isResending}
                            loadingLabel="Resending..."
                        >
                            Resend OTP
                        </Button>
                    </div>

                    <div className="flex flex-col gap-6 justify-center items-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            disabled={timer === 0}
                        >
                            <InputOTPGroup>
                                {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot key={index} className="p-6 text-2xl" index={index} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button
                        className="w-full bg-gray-800 px-2 text-white rounded-md py-2 hover:bg-black"
                        disabled={isLoading || otp.length !== 6 || timer === 0}
                        onClick={() => handleOtp(cnic, otp)}
                        loading={isLoading}
                        loadingLabel="Verifying..."
                    >
                        Submit OTP
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
