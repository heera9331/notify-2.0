// notes/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import { axios } from "@/lib/axios";
import NoteEditor from "@/components/note-editor";
import { useSearchParams, useParams } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/api/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!note) return <div className="p-4 text-red-500">Note not found.</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="min-h-screen">
        <NoteEditor
          initialNote={{
            id: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
