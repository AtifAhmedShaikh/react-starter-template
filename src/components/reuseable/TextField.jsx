"use client";

import React, { forwardRef, useState, useId } from "react";
import { CheckCircle, AlertCircle, Eye, EyeOff, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

export const TextField = forwardRef(
  (
    {
      label,
      error = "",
      wrapperClass = "",
      className = "",
      icon = null,
      leftIcon = null,
      isValid = false,
      type = "text",
      helperText,
      required,
      disabled,
      variant = "outlined",
      optional=false,
      labelDescription="",
      ...rest
    },
    ref
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const uniqueId = useId();
    const inputId = rest.id || rest.name || uniqueId;

    const inputType = type === "password" && isShowPassword ? "text" : type;

    const getVariantClasses = () => {
      switch (variant) {
        case "filled":
          return cn(
            "border-2 !border-primary !bg-gray-200 rounded-sm",
            !disabled && !error && "hover:bg-gray-200",
            !disabled && !error && isFocused && "border-primary bg-primary-50"
          );
        case "underlined":
          return cn(
            "border-b-2 border-gray-300 rounded-none bg-transparent px-0",
            !disabled && !error && "hover:border-gray-500",
            !disabled && !error && isFocused && "border-primary"
          );
        case "outlined":
        default:
          return cn(
            "border-2 border-primary/60 bg-white rounded-sm",
            !disabled &&
            !error &&
            "hover:border-primary/80 hover:bg-primary/10 hover:shadow-input-hover",
            !disabled &&
            !error &&
            isFocused &&
            "border-primary shadow-input-focus"
          );
      }
    };

    return (
      <div className={cn("w-full", wrapperClass)}>
        <label
          htmlFor={inputId}
          className={cn(
            "block font-medium transition-colors duration-200 sm:text-sm text-xs",
            disabled ? "text-gray-400" : "text-gray-700",
            isFocused && !disabled && "text-primary"
          )}
        >
          {label} {optional && <span className="ml-1 text-xs">(optional)</span>}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {labelDescription && <p className="text-xs text-gray-500 mb-1">
          {labelDescription}
        </p>}

        <div
          className={cn(
            "relative group",
            isValid && "has-success",
            error && "has-error"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {leftIcon && (
            <div
              className={cn(
                "absolute inset-y-0 left-3 flex items-center pointer-events-none",
                "text-gray-500 transition-colors duration-200",
                isFocused && !disabled && "text-primary"
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              "w-full transition-all duration-200 outline-none px-2 py-2 sm:text-sm text-xs",
              getVariantClasses(),
              leftIcon && "pl-10",
              type === "password"
                ? "pr-20"
                : isValid || error
                  ? "pr-10"
                  : "pr-3",
              "placeholder:text-gray-400",
              isValid && !error && "border-green-500 bg-green-50/50",
              isValid &&
              !error &&
              isFocused &&
              "border-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.25)]",
              error && "border-red-500 bg-red-50/50",
              error &&
              isFocused &&
              "border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.25)]",
              disabled &&
              "cursor-not-allowed border-gray-200 bg-gray-100/80 text-gray-500",
              isFocused &&
              !disabled &&
              !error &&
              !isValid &&
              "animate-shimmer bg-gradient-to-r from-transparent via-primary-50 to-transparent bg-[length:400%_100%]",
              isHovered && "",
              className
            )}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />

          <div
            className={cn(
              "absolute inset-y-0 right-3 flex items-center",
              "transition-all duration-300",
              isValid || error ? "opacity-100" : "opacity-0"
            )}
          >
            {variant === "filled"&&!error && <>
              <div className="text-primary">
                <CircleCheck size={16} className="text-primary" />
              </div>
            </>
            }
            {isValid && !error && (
              <CheckCircle
                className={cn(
                  "text-green-500 transition-all duration-300",
                  isFocused ? "h-5 w-5" : "h-4 w-4",
                  isFocused && "animate-pulse"
                )}
                aria-hidden="true"
              />
            )}



            {error && (
              <AlertCircle
                className={cn(
                  "text-red-500 transition-all duration-300",
                  isFocused ? "h-5 w-5" : "h-4 w-4"
                )}
                aria-hidden="true"
              />
            )}
          </div>


          {type === "password" && (
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className={cn(
                "absolute inset-y-0 right-10 flex items-center px-2",
                "text-gray-400 hover:text-primary",
                "transition-colors focus:outline-none",
                disabled && "pointer-events-none text-gray-300"
              )}
              disabled={disabled}
              aria-label={isShowPassword ? "Hide password" : "Show password"}
            >
              {isShowPassword ? (
                <EyeOff
                  className={cn(
                    "transition-all duration-200",
                    isFocused ? "h-5 w-5" : "h-4 w-4"
                  )}
                />
              ) : (
                <Eye
                  className={cn(
                    "transition-all duration-200",
                    isFocused ? "h-5 w-5" : "h-4 w-4"
                  )}
                />
              )}
            </button>
          )}

          {variant === "outlined" && !disabled && (
            <div
              className={cn(
                "absolute inset-0 rounded-md pointer-events-none",
                "transition-all duration-300",
                "ring-0 ring-offset-0",
                isFocused &&
                !error &&
                !isValid &&
                "ring-2 ring-primary/20 ring-offset-1",
                isFocused &&
                isValid &&
                "ring-2 ring-green-500/20 ring-offset-1",
                isFocused && error && "ring-2 ring-red-500/20 ring-offset-1"
              )}
            />
          )}
        </div>



        <div className={cn("min-h-5 flex items-start gap-1")}>
          {error && (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-red-500 animate-fadeIn text-xs sm:text-sm">
                {error}
              </span>
            </>
          )}
          {!error && helperText && (
            <>
              <Info className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-500">{helperText}</span>
            </>
          )}
          {icon && <span>{icon}</span>}
        </div>
      </div>
    );
  }
);

TextField.displayName = "TextField";
