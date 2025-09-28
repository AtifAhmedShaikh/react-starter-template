"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

export function DateRangePicker({ value, onChange }) {
  const safeValue = value && typeof value === "object"
    ? {
      from: value.from ? new Date(value.from) : null,
      to: value.to ? new Date(value.to) : null,
    }
    : { from: null, to: null };

  const [selectedRange, setSelectedRange] = useState(safeValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left border-2 border-primary/60 hover:border-primary/80 hover:bg-primary/10 py-2">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedRange?.from && selectedRange?.to
            ? `${format(selectedRange?.from, "MMM d, yyyy")} – ${format(selectedRange?.to, "MMM d, yyyy")}`
            : "Select date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto">
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={(range) => {
            setSelectedRange(range);
            onChange(range);
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
