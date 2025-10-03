// components/form/SelectField.jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

const SelectField = ({
  label,
  name,
  options,
  placeholder,
  error = "",
  className,
  wrapperClass = "",
  variant = "outlined",
  isLoading = false,
  disabled = false,
}) => {
  const { control } = useFormContext();

  const getVariantClasses = () => {
    switch (variant) {
      case "filled":
        return "border-2 !border-primary !bg-gray-200 rounded-sm";
      case "underlined":
        return "border-b-2 border-gray-300 rounded-none bg-transparent px-0";
      case "outlined":
      default:
        return "border-2 border-gray-300 bg-white rounded-sm";
    }
  };

  return (
    <div className={`flex flex-col  w-full ${wrapperClass}`}>
      <label className="font-medium sm:text-sm text-xs">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select value={field.value ?? ""} onValueChange={field.onChange} disabled={disabled}>
            <SelectTrigger
              className={cn(
                "w-full h-12 mx-1 border-2 transition-all sm:text-sm text-xs py-2",
                getVariantClasses(),
                error
                  ? "border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-500/20"
                  : "border-primary/60 hover:border-primary/80 hover:bg-primary/10 hover:shadow-input-hover focus:border-primary focus:ring-2 focus:ring-primary/20",
                className
              )}
            >
              <SelectValue placeholder={placeholder || "Select option"} />
            </SelectTrigger>

            <SelectContent className="max-h-60">
              {isLoading ? (
                <SelectItem disabled className={"flex gap-4"}><span className="animate-spin"><Loader2 /></span>Loading...</SelectItem>
              ) : (
                options?.map((opt, index) =>
                  opt?.id != null ? (
                    <SelectItem key={index} value={String(opt.id)}>
                      {opt.value}
                    </SelectItem>
                  ) : null
                )
              )}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
