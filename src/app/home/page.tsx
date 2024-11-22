"use client";
import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  BarChart3,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { CalendarView } from "@/components/dashboard/calendar-view";
import { NotesSection } from "@/components/dashboard/notes-section";
import { StatsCard } from "@/components/dashboard/stats-card";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { TaskList } from "@/components/dashboard/task-list";

export default function Home() {
  const [progress] = useState(65);

  const stats = [
    {
      label: "Completed",
      value: "24",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    { label: "In Progress", value: "12", icon: Clock, color: "text-blue-500" },
    {
      label: "Pending",
      value: "8",
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Update user interface design",
      description: "Implement new design system across all pages",
      priority: "HIGH",
      dueDate: "2024-03-20T00:00:00Z",
      status: "IN_PROGRESS",
    },
    {
      id: 2,
      title: "Review code documentation",
      description: "Update API documentation and examples",
      priority: "MEDIUM",
      dueDate: "2024-03-21T00:00:00Z",
      status: "TODO",
    },
    {
      id: 3,
      title: "Fix authentication bugs",
      description: "Address user reported login issues",
      priority: "HIGH",
      dueDate: "2024-03-20T00:00:00Z",
      status: "IN_PROGRESS",
    },
    {
      id: 4,
      title: "Prepare sprint presentation",
      description: "Create slides for sprint review",
      priority: "MEDIUM",
      dueDate: "2024-03-27T00:00:00Z",
      status: "TODO",
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold">Task Dashboard</h1>
          </div>
          <CreateTaskDialog />
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid gap-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Progress Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <TaskList tasks={tasks} />
          </div>

          {/* Calendar */}
          <div>
            <CalendarView tasks={tasks} />
          </div>
        </div>

        {/* Notes Section */}
        <NotesSection />
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <Button variant="ghost" className="gap-2">
              <Calendar className="h-4 w-4" /> Calendar
            </Button>
            <Button variant="ghost" className="gap-2">
              <BarChart3 className="h-4 w-4" /> Reports
            </Button>
            <Button variant="ghost" className="gap-2">
              <Users className="h-4 w-4" /> Team
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
