"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar" // Adjust import path if needed

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const [calendar1Month, setCalendar1Month] = React.useState(new Date(2022, 0, 20))
  const [calendar2Month, setCalendar2Month] = React.useState(addDays(new Date(2022, 0, 20), 20))

  const [open, setOpen] = React.useState(false); // State to control popover visibility

  const handleDateSelect = (day: Date | undefined) => {
    if (!day) return;
    if (!dateRange.from || (dateRange.to && day < dateRange.from)) {
      setDateRange({ from: day, to: undefined });
    } else if (!dateRange.to || day > dateRange.from) {
      setDateRange((prev) => ({ ...prev, to: day }));
    }
  }

  const handleDoneClick = () => {
    // Perform action with selected date range
    console.log("Selected date range:", dateRange);
    setOpen(false); // Close the popover
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 mb-2">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(day) => {
                  handleDateSelect(day);
                  setCalendar1Month(day ?? calendar1Month);
                }}
                month={calendar1Month}
                onMonthChange={setCalendar1Month}
              />
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(day) => {
                  handleDateSelect(day);
                  setCalendar2Month(day ?? calendar2Month);
                }}
                month={calendar2Month}
                onMonthChange={setCalendar2Month}
              />
            </div>
            <Button onClick={handleDoneClick} className="w-full">
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
