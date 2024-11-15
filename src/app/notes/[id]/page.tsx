"use client";

import { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { axios } from "@/lib/axios";
import NoteEditor from "@/components/note-editor";
import { useUser } from "@/contexts/user-context";

const Page = ({ params }) => {
  const [] = useState<Post[]>([]);
  

  return (
    <div className="min-h-screen">
      <main className="">
        <div className="">
          <h1 className="text-2xl font-semibold">Notes</h1>
        </div>
        <div className="flex p-4">
          <NoteEditor />
        </div>
      </main>
    </div>
  );
};

export default Page;
