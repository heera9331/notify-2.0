"use client";

import { useEffect, useState } from "react";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import { useUser } from "@/contexts/user-context";
import axios, { AxiosError } from "axios";
import { Note } from "@prisma/client";

const NoteEditor = ({
  id,
  initialNote,
}: {
  id?: number;
  initialNote?: Note;
}) => {
  const [note, setNote] = useState(
    initialNote || {
      title: "",
      content: "",
      parentId: 0,
      userId: "",
      isPublic: false,
      category: "",
    }
  );

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      setNote((prevNote: any) => ({
        ...prevNote,
        userId: user.id.toString(),
      }));
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNote({
      ...note,
      [e.target.name]:
        e.target.name === "parentId" ? Number(e.target.value) : e.target.value,
    });
  };

  // Handle Markdown content change
  const handleEditorChange = ({ text }: { text: string }) => {
    setNote({ ...note, content: text });
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        title: note.title,
        content: note.content,
        category: note.category,
        parentId: note.parentId || 0,
        isPublic: note.isPublic,
        userId: note.userId,
      };

      let response;
      if (id) {
        // Update existing note
        response = await axios.put(`/api/notes/${id}`, payload);
      } else {
        // Create new note
        response = await axios.post("/api/notes", payload);
      }

      if (response.status === 200 || response.status === 201) {
        setSuccess(
          id ? "Note updated successfully!" : "Note created successfully!"
        );
      } else {
        setError("Failed to save note.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ error: string }>;
        setError(axiosError.response?.data?.error || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 w-full bg-gray-50 rounded-xl min-h-fit-content p-8 shadow-lg transition-all delay-200"
    >
      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={note.title}
          onChange={handleInputChange}
          placeholder="Enter note title"
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-1">
          Content (Markdown)
        </label>
        <MarkdownEditor
          value={note.content}
          style={{ height: "500px" }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={note.category || 0}
          onChange={handleInputChange}
          placeholder="Enter note category"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isPublic"
          name="isPublic"
          type="checkbox"
          checked={note.isPublic}
          onChange={(e) => setNote({ ...note, isPublic: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="isPublic" className="text-sm">
          Public
        </label>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Saving Note..." : id ? "Update Note" : "Create Note"}
      </button>
    </form>
  );
};

export default NoteEditor;
