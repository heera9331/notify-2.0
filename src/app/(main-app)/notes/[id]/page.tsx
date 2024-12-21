"use client";

import { useEffect, use, useState } from "react";
import { Note } from "@prisma/client";
import { axios } from "@/lib/axios";
import NoteEditor from "@/components/note-editor";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useNotes } from "@/hooks/use-notes";

const Page = () => {
  const { id } = useParams;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const action = searchParams?.get("action") || "view"; // Get the action from the query

  const { getNote } = useNotes();

  useEffect(() => {
    if (id) {
      const note = getNote(Number(id));
      console.log(note);
      setNote(note);
    } else {
    }
  }, [id, getNote, action]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="min-h-screen">
        <NoteEditor initialNote={note} id={Number(id)} />
      </div>
    </div>
  );
};

export default Page;
