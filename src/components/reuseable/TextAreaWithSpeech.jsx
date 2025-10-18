"use client";

import React, { forwardRef, useState, useId, useRef, useEffect } from "react";
import { AlertCircle, Info, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "@/utils/toastUtils";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Switch } from "../ui/switch";

const TextAreaWithSpeech = forwardRef(
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
    const { setValue, watch } = useFormContext();
    const [isFocused, setIsFocused] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [lang, setLang] = useState("ur-PK");
    const textValue = watch(rest.name) || "";
    const recognitionRef = useRef(null);
    const textAreaRef = useRef(null);
    const uniqueId = useId();
    const inputId = rest.id || rest.name || uniqueId;

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) stopListening();
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () =>
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
    }, []);

    const getVariantClasses = () => {
      switch (variant) {
        case "filled":
          return cn(
            "border-b-2 border-border bg-muted rounded-t-lg",
            !disabled && !error && "hover:bg-muted/80",
            !disabled && !error && isFocused && "border-primary bg-primary/10"
          );
        case "underlined":
          return cn(
            "border-b-2 border-border rounded-none bg-transparent px-0",
            !disabled && !error && "hover:border-primary/50",
            !disabled && !error && isFocused && "border-primary"
          );
        case "outlined":
        default:
          return cn(
            "border-2 border-border bg-background rounded-lg",
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

    const LISTENING_TOAST_ID = "speech-listening";

    const startListening = (language) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        showToast.error(
          "❌ Speech Recognition is not supported in your browser."
        );
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language;
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onstart = () => {
          setIsListening(true);
          setLang(language);
          toast.loading(
            `🎙 Listening in ${language === "en-US" ? "English" : "Urdu"
            }...`,
            { id: LISTENING_TOAST_ID, duration: Infinity }
          );
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          const textarea = textAreaRef.current;
          if (textarea) {
            const { selectionStart, selectionEnd } = textarea;
            const newText =
              textValue.slice(0, selectionStart) +
              transcript +
              textValue.slice(selectionEnd);
            setValue(rest?.name, newText);
          }
        };

        recognition.onerror = (event) => {
          stopListening();
          if (event.error === "not-allowed") {
            showToast.error("🎤 Microphone access denied.");
          } else if (event.error === "network") {
            showToast.error("🌐 Network issue detected.");
          } else if (event.error === "no-speech") {
            toast.warning("⚠️ No speech detected.");
          } else {
            showToast.error(`❌ Error: ${event.error}`);
          }
        };

        recognition.onend = () => {
          stopListening();
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (error) {
        console.error(error);
        showToast.error("❌ Unable to start speech recognition.");
      }
    };

    const stopListening = () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      toast.dismiss(LISTENING_TOAST_ID);
    };

    const toggleLanguage = () => {
      if (!isListening) setLang(lang === "en-US" ? "ur-PK" : "en-US");
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
          {isListening && ("Listening...")}
        </label>
        <div className="text-xs sm:text-sm text-gray-600">
          🎤 You can type using your voice! Speak clearly and your words will
          appear automatically.
        </div>
      

        <div className={cn("relative group", isValid && "has-success", error && "has-error")}>
          <textarea
            ref={(el) => {
              textAreaRef.current = el;
              if (ref) {
                if (typeof ref === "function") ref(el);
                else ref.current = el;
              }
            }}
            id={inputId}
            value={textValue}
            className={cn(
              "w-full transition-all duration-200 outline-none px-2 py-2 min-h-[100px] resize-y sm:text-sm text-xs font-nastaliq",
              getVariantClasses(),
              "placeholder:text-muted-foreground border-primary/60 hover:border-primary/80 hover:bg-primary/10 hover:shadow-input-hover focus:border-primary focus:ring-2 focus:ring-primary/20",
              isValid && !error && "border-green-500 bg-green-50/50",
              error && "border-destructive bg-destructive/10",
              disabled && "cursor-not-allowed border-border bg-muted text-muted-foreground",
              className
            )}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
            onChange={(e) => setValue(rest?.name, e.target.value)}
          />

          {/* Bottom AI-like controls */}
          <div className="absolute right-0 sm:-top-12 -top-0 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 p-2  w-max z-10">

            <TooltipProvider>
              {/* Language toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    {/* English Label (right) */}
                    <span className="text-xs sm:text-sm">English</span>
                    {/* Switch */}
                    <Switch
                      checked={!(lang === "en-US")}
                      onCheckedChange={toggleLanguage}
                      disabled={isListening}
                      className={isListening ? "opacity-50 cursor-not-allowed" : ""}
                    />
                    {/* Urdu Label (left) */}
                    <span className="text-xs sm:text-sm">Urdu</span>

                  </div>
                </TooltipTrigger>
                  {/* <Button
                    type="button"
                    size={"sm"}
                    variant={"outline"}
                    onClick={toggleLanguage}
                    disabled={isListening}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm",
                      isListening && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {lang === "en-US" ? "English" : "Urdu"}
                  </Button> */}
                <TooltipContent side="top" align="center">
                  {isListening
                    ? "Cannot switch language while listening"
                    : "Click to switch language"}
                </TooltipContent>
              </Tooltip>

              {/* Mic button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"sm"}
                    type="button"
                    onClick={() => (isListening ? stopListening() : startListening(lang))}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-md",
                      isListening
                        ? "bg-destructive animate-pulse hover:bg-destructive/90"
                        : "bg-primary hover:bg-primary/80"
                    )}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    {isListening ? "Stop" : "Speak"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  {isListening
                    ? "Click to stop voice input"
                    : "Click to start voice input"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>


        </div>

        {/* Error or Helper Text */}
        <div className={cn("min-h-3 flex items-start gap-1 mt-1")}>
          {error ? (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-red-500 text-xs sm:text-sm">{error}</span>
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

TextAreaWithSpeech.displayName = "TextAreaWithSpeech";

export default TextAreaWithSpeech;
