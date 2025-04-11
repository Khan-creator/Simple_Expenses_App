"use client";

import Dashboard from "@/components/dashboard";
import AppointmentCalendar from "@/components/appointment-calendar";
import {RevenueInput} from "@/components/revenue-input";
import {ExpenseInput} from "@/components/expense-input";
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger} from "@/components/ui/sidebar";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Expense, Revenue} from "@/types";
import { LucideIcon } from 'lucide-react';
import { Calendar, DollarSign, FileBarChart, LayoutDashboard } from 'lucide-react';

const STORAGE_KEY_REVENUE = 'bizflow_revenue';
const STORAGE_KEY_EXPENSE = 'bizflow_expenses';

// Function to get item from local storage, if it doesn't exist return the default value.
function getItem<T>(key: string, defaultValue: T): T {
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

// Function to set item in local storage.
function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
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

// The main component of the home page.
export default function Home() {
  // State to hold the revenue data. Initialize with an empty array.
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  // State to hold the expense data. Initialize with an empty array.
  const [expenseData, setExpenseData] = useState<Expense[]>([]);

  // Effect to load data from local storage when the component mounts
  useEffect(() => {
    // Check if we are in the client side
    // This code only runs on the client side.
    if (typeof window !== 'undefined') {
      // Load revenue data from local storage if it exists.
      const storedRevenue = localStorage.getItem(STORAGE_KEY_REVENUE);
      if(storedRevenue) {
        setRevenueData(getItem<Revenue[]>(STORAGE_KEY_REVENUE, []));
      }
      // Load expense data from local storage if it exists.
      const storedExpenses = localStorage.getItem(STORAGE_KEY_EXPENSE);
      if(storedExpenses) {
        setExpenseData(getItem<Expense[]>(STORAGE_KEY_EXPENSE, []));
      }
    }
  }, []);

  // Effect to save revenue data to local storage when it changes.
  useEffect(() => {
    // Check if we are in the client side
    if (typeof window !== 'undefined') {
      setItem(STORAGE_KEY_REVENUE, revenueData);
    }
  }, [revenueData]);
  // Effect to save expense data to local storage when it changes.
  useEffect(() => {
    // Check if we are in the client side
    if (typeof window !== 'undefined') {
      setItem(STORAGE_KEY_EXPENSE, expenseData);
    }}, [expenseData]);

  const handleRevenueSubmit = (newRevenue: Revenue) => {
    setRevenueData([...revenueData, newRevenue]);
  };

  const handleExpenseSubmit = (newExpense: Expense) => { // Modify to add the new expense to the list of expenses
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
          <SidebarMenu>{
            // Iterate the navigation items
            navItems.map((item) => (
              // Render a SidebarMenuItem
              <SidebarMenuItem key={item.title} >
                {/* Use a Link to allow internal navigation to each section */}
                <Link href={item.href} className="flex items-center w-full px-3 py-2 rounded-md hover:bg-accent">
                    <item.icon className="mr-2 h-4 w-4" />{item.title}
                </Link>
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
