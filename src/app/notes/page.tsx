"use client";

import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import { axios } from "@/lib/axios";
import Link from "next/link";
import { useNotes } from "@/hooks/use-notes";
import { Trash, Trash2 } from "lucide-react";

const Page = () => {
  const { notes, deleteNote } = useNotes();

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteNote(id);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
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
        </ul>
      </header>

      <main className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <p>Total Notes: {notes.length}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col gap-4 w-full overflow-hidden bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="font-bold text-lg mb-2">{note.title}</h2>
              <p className="text-sm text-gray-600 mb-4 overflow-hidden">
                {note.content.length > 100
                  ? `${note.content.slice(0, 100)}...`
                  : note.content}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/notes/${note.id}?action=view`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
                <Trash2
                  className="cursor-pointer w-4 h-4 text-red-600"
                  onClick={() => {
                    handleDelete(note.id);
                  }}
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
