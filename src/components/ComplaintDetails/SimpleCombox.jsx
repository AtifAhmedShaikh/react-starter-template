"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const SimpleCombobox = ({
  name,
  label,
  placeholder = "Select...",
  options = [],
  valueKey = "id",
  labelKey = "value",
  error = "",
  disabled = false,
  required = false,
  onValueChange, // ✅ allow external change handling
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="font-medium">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => {
          const selectedLabel =
            options.find((item) => String(item[valueKey]) === String(field.value))?.[labelKey] || "";

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  aria-expanded={open}
                  className={cn(
                    "items-center border-2 relative w-full h-10 text-left transition-all duration-300 ease-in-out transform opacity-0 animate-fade-in disabled:!bg-gray-100 line-clamp-1  disabled:cursor-not-allowed disabled:!opacity-50 disabled:border-gray-300",
                    error
                      ? "border-red-500 bg-red-50/50"
                      : "border-primary/60 hover:border-primary/80 hover:bg-primary/10"
                  )}
                >
                  <span className="mr-6 truncate">{selectedLabel || placeholder}</span>
                  <ChevronsUpDownIcon className="h-4 w-4 absolute right-2 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                  <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
                  <CommandList>
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((item) => {
                        const itemValue = String(item[valueKey]);
                        const itemLabel = item[labelKey];
                        return (
                          <CommandItem
                            key={itemValue}
                            value={itemLabel?.toLowerCase() || ""}
                            onSelect={() => {
                              field.onChange(itemValue);
                              onValueChange?.(itemValue); // ✅ call your handler
                              setOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === itemValue ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {itemLabel}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {error && (
        <p className="text-red-500 text-sm flex gap-2 items-center">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
};

export default SimpleCombobox;
