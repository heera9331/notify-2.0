"use client";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { CassetteTape, LayoutDashboard } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useNotes } from "@/hooks/use-notes";
import { useParams } from "next/navigation";

interface Note {
  id: number;
  title: string;
  content: string; // Assuming content is a string of HTML or text
}

const Page = () => {
  const { id } = useParams(); 
  const { deleteNote } = useNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  // Handle note deletion
  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/api/notes?category=${id}&page=1`);
        console.log(response);
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen p-6 ">
      {/* Header */}
      <header className="mb-4">
        <ul className="flex gap-4">
          <li>
            <Link
              href="/notes/0?action=new"
              className="text-blue-500 hover:underline"
            >
              Create Note
            </Link>
          </li>

          <li>
            <Link
              className="text-blue-500 border border-blue-500 px-2 py-1 rounded-md hover:text-blue-600"
              href={"/all-categories"}
            >
              view all
            </Link>
          </li>
        </ul>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <p>Total Notes: {notes.length}</p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col gap-4 w-full bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              {/* Note Title */}
              <h2 className="font-bold text-lg">{note.title}</h2>

              {/* Note Content */}
              <div className="text-sm text-gray-600 mb-4 overflow-hidden">
                <div
                  dangerouslySetInnerHTML={{
                    __html: note.content || "No content available",
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <Link
                  href={`/notes/${note.id}?action=view`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
                <Trash2
                  className="cursor-pointer w-4 h-4 text-red-600"
                  onClick={() => handleDelete(note.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
