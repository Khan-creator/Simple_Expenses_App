"use client";

import {Calendar} from "@/components/ui/calendar";
import {Card, CardContent} from "@/components/ui/card";

const AppointmentCalendar: React.FC = () => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-0 pt-4">
        <Calendar/>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;
