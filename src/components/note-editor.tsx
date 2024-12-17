"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import axios from "axios";
import { useUser } from "@/contexts/user-context";

const EDITOR_HOLDER_ID = "editorjs-container";

interface NoteProps {
  id: number;
  initialNote?: {
    id: number;
    title: string;
    content: string;
    userId: number;
  };
}

const NoteEditor = ({ id, initialNote }: NoteProps) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const { user } = useUser();

  const [note, setNote] = useState(
    initialNote || { id: 0, title: "Post title", content: "{}", userId: 4 }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setNote(initialNote);
    }
  }, [initialNote]);

  useEffect(() => {
    initializeEditor();

    return () => {
      if (editorInstance.current) {
        // editorInstance.current.destroy(); // Destroy instance to avoid memory leaks
        editorInstance.current = null;
      }
    };
  }, []); // Reinitialize the editor if note.content changes

  const initializeEditor = () => {
    if (editorInstance.current) {
      editorInstance.current.destroy(); // Destroy the previous instance
    }

    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      tools: {
        header: Header,
        paragraph: Paragraph,
        list: List,
        checklist: Checklist,
        table: Table,
        code: Code,
        inlineCode: InlineCode,
        quote: Quote,
        marker: Marker,
        delimiter: Delimiter,
        embed: Embed,
      },
      placeholder: "Press '/' for commands...",
      data: note.content ? JSON.parse(note.content) : undefined,
      onChange: async () => {
        const savedData = await editor.save();
        setNote((prev) => ({
          ...prev,
          content: JSON.stringify(savedData),
        }));
      },
    });

    editorInstance.current = editor;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, title: e.target.value });
  };

  const saveNote = async () => {
    setLoading(true);
    try {
      const data = JSON.parse(note.content ?? "{}");
      const payload = {
        title: note.title,
        content: data,
        userId: user?.id ?? 0,
      };

      const response = await axios({
        method: note.id ? "put" : "post",
        url: note.id ? `/api/notes/${note.id}` : "/api/notes",
        data: payload,
      });

      console.log("Saved note:", response.data);
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start mb-4">
        <Button onClick={saveNote} disabled={loading} className="gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save
        </Button>
      </div>

      <Card className="flex justify-center flex-col gap-2 items-center bg-gray-50 border-none shadow-none py-14 max-w-[900px]">
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          className="w-[80%] py-2 px-4 bg-gray-50 text-3xl font-bold active:focus:bg-white"
          placeholder="Set note title"
        />
        <div className="w-[80%]">
          <div
            id={EDITOR_HOLDER_ID}
            className="prose prose-stone dark:prose-invert max-w-none"
          />
        </div>
      </Card>
    </>
  );
};

export default NoteEditor;
