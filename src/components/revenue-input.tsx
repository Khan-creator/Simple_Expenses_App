"use client";

import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {forwardRef, useState} from "react";
import {format} from "date-fns";
import {Revenue} from "@/types";

interface RevenueInputProps {
  onSubmit: (revenue: Revenue) => void;
}

export const RevenueInput: React.FC<RevenueInputProps> = ({onSubmit}) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = () => {
    if (amount !== undefined && date) {
      onSubmit({amount, date: date.toISOString()});
      setAmount(undefined);
      setDate(undefined);
    } else {
      alert("Please enter both amount and date.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Revenue</CardTitle>
        <CardDescription>Enter revenue details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Input
            type="number"
            placeholder="Amount"
            value={amount !== undefined ? amount.toString() : ""}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date > new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleSubmit}>Submit Revenue</Button>
      </CardContent>
    </Card>
  );
};
