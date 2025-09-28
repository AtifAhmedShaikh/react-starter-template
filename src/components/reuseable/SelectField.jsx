import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

const SelectField = ({
  label,
  name,
  options = [],
  placeholder,
  error = "",
  className = "",
  variant = "outlined",
}) => {
  const { control } = useFormContext(); // ✅ Fix: hook into parent form

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
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={cn(
                "w-full h-12 mx-1 transition-all sm:text-sm text-xs",
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
              {options?.length ? (
                options.map((opt, index) => (
                  <SelectItem key={index} value={opt?.id}>
                    {opt?.value}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="-" disabled>
                  No options available
                </SelectItem>
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
