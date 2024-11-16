"use client";

import { Post } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";

const Page = () => {
  const [] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/tasks");
      const data = response.data;
      console.log(data);
    })();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="mb-4">
        <ul className="flex gap-4">
          <li>
            <Link
              href="/tasks/0&action=new"
              className="text-blue-500 hover:underline"
            >
              Create Task
            </Link>
          </li>
        </ul>
      </header>

      <main className="">
        <div className="">
          <Tasks />
        </div>
      </main>
    </div>
  );
};

type Task = {
  id: number;
  title: string;
  content: string;
  postType: string;
  createdAt: string;
  updatedAt: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/tasks");
        console.log(response);
        setTasks(response.data);
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError(err.response?.data?.error || "Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <p>No tasks found. Create a new one!</p>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-700 text-sm mb-4">{task.content}</p>
              <p className="text-xs text-gray-500">
                <strong>Type:</strong> {task.postType}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Created:</strong>{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
