"use client";

import { use, useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { axios } from "@/lib/axios";
import CreatePostForm from "@/components/create-post-form";
import { useTasks } from "@/hooks/use-tasks";

interface PageProps {
  params: {
    id: string;
  };
}
const Page = ({ params }: PageProps) => {
  const [task, setTask] = useState<Post[]>([]);
  const { getTask } = useTasks();
  const param = use(params);

  useEffect(() => {
    const task = getTask(Number(params.id));
    setTask(task);
  }, [getTask, params.id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="">
        <div className="">
          <h1 className="text-2xl font-semibold">Tasks</h1>
        </div>
        <div className="flex justify-start py-4">
          <CreatePostForm intialTask={task}/>
        </div>
      </main>
    </div>
  );
};

export default Page;
