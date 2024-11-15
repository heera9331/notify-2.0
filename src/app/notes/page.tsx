"use client";

import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import { axios } from "@/lib/axios";
import Link from "next/link";

const Page = () => {
  const [] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/notes");
      const data = response.data;
      console.log(data);
    })();
  }, []);

  return (
    <div className="bg-red-500 min-h-screen">
      <ul>
        <li>
          <Link href={"/notes/0&action=new"}>Create Note</Link>
        </li>
      </ul>
      <main className="">
        <div className="">
          <h1 className="text-2xl font-semibold">Note</h1>
        </div>
      </main>
    </div>
  );
};

export default Page;
