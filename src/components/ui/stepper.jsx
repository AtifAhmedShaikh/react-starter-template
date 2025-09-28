import { Check } from "lucide-react";
import { forwardChargeSteps  } from "@/constants/index";

export const EnhancedStepper = ({ currentStep, isForwardBack=false }) => {
  const steps=forwardChargeSteps.filter(e => !(e?.id === 1 && isForwardBack));
  return (
    <div className="w-full py-6">
      <div className="relative  flex items-center justify-between">
        {/* Progress Line */}
        {/* <div className="absolute left-0 top-6 right-0  mx-6 h-0.5 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${
                currentStep === 0
                  ? 0
                  : (currentStep / (steps.length - 1)) * 100
              }%`,
            }}
          />
        </div> */}

        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10 flex-1">
            <div
              className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm
                transition-all duration-300 ease-out
                ${
                  index < currentStep
                    ? "bg-primary border-primary  text-primary-foreground shadow-lg"
                    : index === currentStep
                    ? "bg-primary border-primary text-primary-foreground animate-pulse"
                    : "bg-background border-muted-foreground/30 animate-pulse text-muted-foreground"
                }
              `}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
            </div>
            <div className="mt-3 text-center max-w-[150px]">
              <div
                className={`text-xs font-medium ${
                  index <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 hidden sm:block">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
