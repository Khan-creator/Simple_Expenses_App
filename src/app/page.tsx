"use client";

import Dashboard from "@/components/dashboard";
import AppointmentCalendar from "@/components/appointment-calendar";
import {RevenueInput} from "@/components/revenue-input";
import {ExpenseInput} from "@/components/expense-input";
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger} from "@/components/ui/sidebar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Revenue, Expense} from "@/types";
import { LucideIcon } from 'lucide-react';
import { Calendar, DollarSign, FileBarChart, LayoutDashboard } from 'lucide-react';

const STORAGE_KEY_REVENUE = 'bizflow_revenue';
const STORAGE_KEY_EXPENSE = 'bizflow_expenses';

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch (e) {
    console.error("Failed to parse stored data", e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const navItems: {
  title: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Dashboard',
    href: '#dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Calendar',
    href: '#calendar',
    icon: Calendar,
  },
  {
    title: 'Revenue',
    href: '#revenue',
    icon: DollarSign,
  },
  {
    title: 'Expenses',
    href: '#expenses',
    icon: FileBarChart,
  },
];


export default function Home() {
  const [revenueData, setRevenueData] = useState<Revenue[]>(() => getItem(STORAGE_KEY_REVENUE, []));
  const [expenseData, setExpenseData] = useState<Expense[]>(() => getItem(STORAGE_KEY_EXPENSE, []));

  useEffect(() => {
    setItem(STORAGE_KEY_REVENUE, revenueData);
  }, [revenueData]);

  useEffect(() => {
    setItem(STORAGE_KEY_EXPENSE, expenseData);
  }, [expenseData]);

  const handleRevenueSubmit = (newRevenue: Revenue) => {
    setRevenueData([...revenueData, newRevenue]);
  };

  const handleExpenseSubmit = (newExpense: Expense) => {
    setExpenseData([...expenseData, newExpense]);
  };

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const profit = totalRevenue - totalExpenses;

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <CardTitle>BizFlow</CardTitle>
          <CardDescription>Basic ERP for Small Businesses</CardDescription>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <Button variant="outline" className="w-full">
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      <div className="container mx-auto p-4 md:pl-[16rem]">
        <section id="dashboard" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <Dashboard revenue={totalRevenue} expenses={totalExpenses} profit={profit} />
        </section>

        <section id="calendar" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>
          <AppointmentCalendar />
        </section>

        <section id="revenue" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Revenue Input</h2>
          <RevenueInput onSubmit={handleRevenueSubmit} />
        </section>

        <section id="expenses">
          <h2 className="text-2xl font-bold mb-4">Expense Input</h2>
          <ExpenseInput onSubmit={handleExpenseSubmit} />
        </section>
      </div>
    </>
  );
}
