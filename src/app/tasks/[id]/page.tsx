"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import CreatePostForm from "@/components/create-post-form";
import { useTasks } from "@/hooks/use-tasks";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { getTask } = useTasks(); // Function to fetch a task by ID
  const [task, setTask] = useState<Post | null>(null); // State for the fetched task
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state

  const { id } = React.use(params);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const fetchedTask = getTask(Number(id));
        setTask(fetchedTask);
      } catch (err) {
        console.error("Failed to fetch task:", err);
        setError("Failed to fetch the task. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id, getTask]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main>
        <div>
          <h1 className="text-2xl font-semibold">Task Details</h1>
        </div>
        <div className="flex justify-start py-4">
          {task ? (
            <CreatePostForm initialTask={task} />
          ) : (
            <p>No task found with the given ID.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
