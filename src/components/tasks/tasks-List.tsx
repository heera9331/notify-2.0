"use client";
import { useTasks } from "@/hooks/use-tasks";
import { Task } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const TaskList = ({ tasks = [] }: { tasks: Task[] }) => {
  const { deleteTask } = useTasks();

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteTask(id);
      console.log(response);
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.success("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-700 text-sm mb-4">
                {task.content.length < 200
                  ? task.content
                  : task.content.slice(200)}
              </p>

              <p className="text-xs text-gray-500">
                <strong>Created:</strong>
                {new Date(task.createdAt).toLocaleDateString()}
              </p>

              <div className="w-full flex justify-between items-center mt-2">
                <Link
                  href={`/tasks/${task.id}?action=view`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
                <Trash2
                  className="cursor-pointer w-4 h-4 text-red-600"
                  onClick={(e) => {
                    console.log(e);
                    handleDelete(task.id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
