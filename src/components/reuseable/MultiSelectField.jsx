
"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon, Loader as LoaderIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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

const MultiSelectField = ({
    label,
    options = [],
    placeholder = "Select...",
    value = [],            // ✅ array for multiple selection
    onChange,
    isLoading = false,
    valueKey = "id",
    labelKey = "value",
    disableKey = "",       // optional key to disable some items
    required = false
}) => {
    const [open, setOpen] = useState(false);

    const toggleValue = (itemValue) => {
        if (value.includes(itemValue)) {
            onChange(value.filter((v) => v !== itemValue));
        } else {
            onChange([...value, itemValue]);
        }
    };

    const selectedItems = options.filter((opt) =>
        value.includes(String(opt[valueKey]))
    );

    const selectedLabels =
        selectedItems.length === 0
            ? ""
            : selectedItems.length === 1
                ? selectedItems[0][labelKey]
                : `${selectedItems[0][labelKey]} + ${selectedItems.length - 1}`;

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="font-medium">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="overflow-hidden" asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "justify-between border-2 w-full h-10 text-left",
                            "border-primary/60 hover:border-primary/80 hover:bg-primary/10"
                        )}
                    >
                        {selectedLabels || placeholder}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                    <Command>
                        <CommandInput placeholder={`Search ${label?.toLowerCase()}...`} />
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
                                            const isDisabled = disableKey && item[disableKey];

                                            return (
                                                <CommandItem
                                                    key={itemValue}
                                                    value={itemLabel?.toLowerCase() || ""}
                                                    onSelect={() => {
                                                        if (!isDisabled) {
                                                            toggleValue(itemValue);
                                                        }
                                                    }}
                                                    disabled={isDisabled}
                                                    className={cn(isDisabled && "opacity-50 cursor-not-allowed")}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value.includes(itemValue) ? "opacity-100" : "opacity-0"
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
        </div>
    );
};

export default MultiSelectField;
