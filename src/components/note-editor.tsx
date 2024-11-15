"use client";

import { useEffect, useState } from "react";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import { axios } from "@/lib/axios";
import { useUser } from "@/contexts/user-context";

const NoteEditor = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    parentId: 0,
    userId: "", // Dynamically set based on user context
    isPublic: false,
    category: "",
  });

  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      setNote((prevNote) => ({
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
      console.log(note);
      const response = await axios.post("/api/notes", note);

      if (response.status === 201) {
        setSuccess("Note created successfully!");
        setNote({
          title: "",
          content: "",
          parentId: 0,
          userId: user?.id.toString() || "",
          isPublic: false,
          category: "",
        });
      } else {
        setError("Failed to create note.");
      }
    } catch (err: any) {
      // Handle Axios errors
      if (err.response) {
        setError(err.response.data?.error || "Failed to create note.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error:", err);
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
        <label htmlFor="parentId" className="block mb-1">
          Parent ID
        </label>
        <input
          id="parentId"
          name="parentId"
          type="number"
          value={note.parentId}
          onChange={handleInputChange}
          placeholder="Enter parent note ID (0 if root)"
          className="w-full border rounded p-2"
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
          value={note.category}
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
        {loading ? "Creating Note..." : "Create Note"}
      </button>
    </form>
  );
};

export default NoteEditor;
