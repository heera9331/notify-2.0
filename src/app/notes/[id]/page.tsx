/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, use, useState } from "react";
import { Note } from "@prisma/client";
import { axios } from "@/lib/axios";
import NoteEditor from "@/components/note-editor";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useSearchParams, useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const action = searchParams?.get("action") || "view"; // Get the action from the query
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
    const fetchNote = async () => {
      if (id && action === "edit") {
        try {
          const response = await axios.get(`/api/notes/${id}`);
          console.log(response);
          setNote(response.data);
        } catch (err: any) {
          setError("Failed to fetch note.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Skip fetching for "new" or "view"
      }
    };

    fetchNote();
  }, [id, action]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (action === "edit" || action === "new") {
    return (
      <NoteEditor id={action === "edit" ? id : undefined} initialNote={note} />
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">View Note</h1>
        <button
          onClick={() => router.push(`/notes/${id}?action=edit`)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Edit Note
        </button>
      </header>

      <main className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow ">
        <h2 className="text-xl font-bold mb-4">{note?.title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Category:</span>{" "}
          {note?.category || "Uncategorized"}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Public:</span>{" "}
          {note?.isPublic ? "Yes" : "No"}
        </p>
        <article className="prose max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {note?.content || ""}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
};

export default Page;
