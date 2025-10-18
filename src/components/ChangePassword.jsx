"use client";

import { Button } from "@/components/ui/button";
import { HTTP_METHODS } from "@/constants";
import { AUTH_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { changePasswordSchema } from "@/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toastUtils";
import { TextField } from "./reuseable/TextField";

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });

    const submitHandler = async (data) => {
        setLoading(true);
        const response = await apiHandler(AUTH_APIS.CHANGE_PASSWORD,{
            method: HTTP_METHODS.POST,
            data: data
        });
        setLoading(false);
        if (!response.success) {
            showToast.error(response.message);
            return;
        }

        showToast.success(response.message);
        reset();
    };

    return (
        <div className="flex justify-center items-center h-full w-full px-4">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full max-w-md bg-card shadow-md rounded-xl p-8 space-y-6 border"
            >
                <h2 className="text-2xl font-bold text-center text-foreground">Change Password</h2>

                <TextField
                    label="Current Password"
                    error={errors?.currentPassword?.message}
                    type="password"
                    placeholder="Enter your current password"
                    {...register("currentPassword")}
                />

                <TextField
                    label="New Password"
                    error={errors?.newPassword?.message}
                    type="password"
                    placeholder="Enter new password"
                    {...register("newPassword")}
                />

                <TextField
                    label="Confirm Password"
                    error={errors?.confirmPassword?.message}
                    type="password"
                    placeholder="Confirm new password"
                    {...register("confirmPassword")}
                />

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className={"w-full"}
                        loading={loading}
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </div>
    );
}
