"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface DashboardProps {
  revenue: number;
  expenses: number;
  profit: number;
}

const Dashboard: React.FC<DashboardProps> = ({revenue, expenses, profit}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>All income</CardDescription>
        </CardHeader>
        <CardContent>
          ${revenue.toFixed(2)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>All spending</CardDescription>
        </CardHeader>
        <CardContent>
          ${expenses.toFixed(2)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profit</CardTitle>
          <CardDescription>Revenue - Expenses</CardDescription>
        </CardHeader>
        <CardContent>
          ${profit.toFixed(2)}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
