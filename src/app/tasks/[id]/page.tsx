"use client";

import { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { axios } from "@/lib/axios";
import CreatePostForm from "@/components/create-post-form";
const Page = ({ params }) => {
  const [] = useState<Post[]>([]);

  console.log(params.id);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/tasks");
      const data = response.data;
      console.log(data);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="">
        <div className="">
          <h1 className="text-2xl font-semibold">Tasks</h1>
        </div>
        <div className="flex justify-center items-center py-4">
          <CreatePostForm />
        </div>
      </main>
    </div>
  );
};

export default Page;
