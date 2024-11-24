"use client";

import React, { useState, useEffect } from "react";
import { Task } from "@prisma/client"; // Assuming Prisma-generated types
import { useTasks } from "@/hooks/use-tasks"; // Custom hook to fetch tasks

const KanbanBoard = () => {
  const { tasks } = useTasks(); // Fetch tasks from the backend
  const [groupedTasks, setGroupedTasks] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    if (tasks) {
      // Group tasks by their status
      const grouped = tasks.reduce(
        (acc: Record<string, Task[]>, task: Task) => {
          if (!acc[task.status]) acc[task.status] = [];
          acc[task.status].push(task);
          return acc;
        },
        {}
      );
      setGroupedTasks(grouped);
    }
  }, [tasks]);

  return (
    <div className="flex flex-wrap min-h-screen bg-gray-100 p-4 gap-4">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div
          key={status}
          className="w-1/3 bg-white rounded shadow p-4 border border-gray-200"
        >
          <h2 className="text-lg font-semibold mb-4">{status}</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-md font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500 truncate">{task.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
