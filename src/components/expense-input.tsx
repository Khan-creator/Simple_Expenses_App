"use client";

import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {useState} from "react";
import {format} from "date-fns";
import {Expense} from "@/types";

interface ExpenseInputProps {
  onSubmit: (expense: Expense) => void;
}

export const ExpenseInput: React.FC<ExpenseInputProps> = ({onSubmit}) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (amount !== undefined && date && category) {
      onSubmit({amount, date: date.toISOString(), category, description});
      setAmount(undefined);
      setDate(undefined);
      setCategory("");
      setDescription("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Expense</CardTitle>
        <CardDescription>Enter expense details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="Amount"
            value={amount !== undefined ? amount.toString() : ""}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label>Date</Label>
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
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a category"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Salaries">Salaries</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Submit Expense</Button>
      </CardContent>
    </Card>
  );
};
