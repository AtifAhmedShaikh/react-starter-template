"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { HTTP_METHODS, OTP_REQUEST_NOTIFICATION_TYPES, OTP_TIMER } from "@/constants";
import { apiHandler } from "@/lib/apiWrapper";
import { AUTH_APIS } from "@/constants/APIs";

export const OtpPromptModal = ({ open, onClose, onConfirm, isSubmitting = false, notificationTypes = OTP_REQUEST_NOTIFICATION_TYPES, metadata="" }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(OTP_TIMER);

  useEffect(() => {
    if (open) {
      setOtp("");
      setTimer(OTP_TIMER);
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      (async () => {
        await apiHandler(AUTH_APIS.REQUEST_OTP, {
          method: HTTP_METHODS.POST,
          data: { notificationTypes, metadata },
        })
      })()
      return () => clearInterval(interval);
    }
  }, [open]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleConfirm = () => {
    if (otp.length === 6) {
      onConfirm(otp);  // ✅ Return OTP to the caller
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} closeOnOutsideClick={false} >
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Enter OTP</DialogTitle>

          <div className="text-sm text-muted-foreground text-center">
            {timer > 0 ? `OTP expires in ${formatTime(timer)}` : "OTP expired. Please try again."}
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => setOtp(val.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} className="p-4 text-xl" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full mt-4"
            disabled={otp.length !== 6 || timer === 0}
            onClick={handleConfirm}
            loading={isSubmitting}
          >
            Submit OTP
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
