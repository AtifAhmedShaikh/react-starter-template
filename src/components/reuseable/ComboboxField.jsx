"use client";

import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon, Loader as LoaderIcon } from "lucide-react";

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

const ComboboxField = ({
  name,
  label,
  placeholder = "Select...",
  options = [],
  valueKey = "id",
  labelKey = "value",
  disableKey = "",        // ✅ New prop
  fetchOptions,
  isLoading = false,
  className = "",
  error = "",
  disabled = false,
  required = false
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchOptions?.();
  }, [fetchOptions]);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-medium sm:text-sm text-xs">{label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>}


      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => {
          const selectedLabel =
            options.find((item) => String(item[valueKey]) === String(field.value))?.[labelKey] ||
            "";

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className={"overflow-hidden"} asChild>
                <Button
                  variant="outline"
                  disabled={disabled}
                  role="combobox"
                  required={true}
                  aria-expanded={open}
                  className={cn(
                    "  items-center border-2 relative  disabled:!bg-gray-100 line-clamp-1  disabled:cursor-not-allowed disabled:!opacity-50 disabled:border-gray-300 w-full h-10 text-left",
                    error
                      ? "border-red-500 bg-red-50/50"
                      : "border-primary/60 hover:border-primary/80 hover:bg-primary/10",
                    className
                  )}
                >
                  <span className="!line-clamp-1 mr-6 !w-[calc(100%-15px)] overflow-hidden block">
                    {selectedLabel || placeholder}

                  </span>
                  <ChevronsUpDownIcon className=" h-4 w-4 absolute top-2.5  right-2  shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] max-h-32">
                <Command>
                  <CommandInput placeholder={` ${placeholder.toLowerCase()}...`} />
                  <CommandList>
                    {isLoading ? (
                      <CommandItem disabled className="flex justify-center items-center text-sm">
                        <LoaderIcon className="w-4 h-4 animate-spin text-primary" />
                        <span className="ml-2">Loading...</span>
                      </CommandItem>
                    ) : (
                      <>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((item) => {
                            const itemValue = String(item[valueKey]);
                            const itemLabel = item[labelKey];
                            const isDisabled = disableKey && item[disableKey]; // ✅ Check condition

                            return (
                              <CommandItem
                                key={itemValue}
                                value={itemLabel?.toLowerCase() || ""}
                                onSelect={() => {
                                  if (!isDisabled) {
                                    field.onChange(itemValue);
                                    setOpen(false);
                                  }
                                }}
                                disabled={isDisabled}
                                className={cn(isDisabled && "opacity-50 cursor-not-allowed")}
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
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {error && <p className="text-red-500 text-sm  flex gap-2 items-center"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />{error}</p>}
    </div>
  );
};

export default ComboboxField;
