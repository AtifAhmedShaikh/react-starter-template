"use client";

import React, { forwardRef, useState, useId } from "react";
import { AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const TextAreaField = forwardRef(
  (
    {
      label,
      error = "",
      wrapperClass = "",
      className = "",
      isValid = false,
      helperText,
      required,
      disabled,
      variant = "outlined",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const uniqueId = useId();
    const inputId = rest.id || rest.name || uniqueId;

    const getVariantClasses = () => {
      switch (variant) {
        case "filled":
          return cn(
            "border-b-2 border-gray-300 bg-gray-100 rounded-t-lg",
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
            "border-2 border-gray-300 bg-white rounded-lg",
            !disabled &&
              !error &&
              "hover:border-primary-400 hover:shadow-input-hover",
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
            "block font-medium transition-colors duration-200",
            disabled ? "text-gray-400" : "text-gray-700",
            isFocused && !disabled && "text-primary"
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <div
          className={cn(
            "relative group",
            isValid && "has-success",
            error && "has-error"
          )}
        >
          <textarea
            ref={ref}
            id={inputId}
            className={cn(
              "w-full transition-all duration-200 outline-none px-2 py-2 min-h-[100px] resize-y sm:text-sm text-xs",
              getVariantClasses(),
              "placeholder:text-gray-400 border-primary/60 hover:border-primary/80 hover:bg-primary/10 hover:shadow-input-hover focus:border-primary focus:ring-2 focus:ring-primary/20", 
              isValid && !error && "border-green-500 bg-green-50/50",
              error && "border-red-500 bg-red-50/50",
              disabled &&
                "cursor-not-allowed border-gray-200 bg-gray-100/80 text-gray-500",
              className
            )}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
        </div>

        {/* Error or Helper Text */}
        <div className={cn("min-h-3 flex items-start gap-1")}>
          {error ? (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-red-500 animate-fadeIn text-xs sm:text-sm">
                {error}
              </span>
            </>
          ) : (
            helperText && (
              <>
                <Info className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-500">{helperText}</span>
              </>
            )
          )}
        </div>
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
