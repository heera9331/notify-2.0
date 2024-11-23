"use client";
import { use, useEffect, useRef, useState } from "react";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import axios from "axios";
import "@/app/globals.css";
import css from "styled-jsx/css";
import { useSearchParams } from "next/navigation";

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

const NoteEditor = ({ id: number, initialNote }: NoteProps) => {
  // const { toast } = useToast();
  const editorInstance = useRef<EditorJS | null>(null);

  const [note, setNote] = useState(
    initialNote || {
      id: 0,
      title: "Post title",
      content: "{}",
      userId: 4,
    }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setNote(initialNote);
    }
  }, [initialNote]);

  useEffect(() => {
    if (!editorInstance.current) {
      initializeEditor();
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current = null;
      }
    };
  }, []);

  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        code: {
          class: Code,
        },
        inlineCode: InlineCode,
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        delimiter: Delimiter,
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codesandbox: true,
              codepen: true,
            },
          },
        },
      },
      placeholder: "Press '/' for commands...",
      data: note.content ? JSON.parse(note.content) : undefined,
      onChange: async () => {
        const savedData = await editor.save();
        setNote((prev: any) => ({
          ...prev,
          content: JSON.stringify(savedData),
        }));
      },
    });

    editorInstance.current = editor;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      title: e.target.value,
    });
  };

  const saveNote = async () => {
    setLoading(true);
    try {
      const data = JSON.parse(note.content ?? "");

      let payload = {
        title: note.title,
        content: data,
        userId: 4,
      };

      console.log(payload);

      const response = await axios({
        method: note.id ? "put" : "post",
        url: note.id ? `/api/notes/${note.id}` : "/api/notes",
        data: payload,
      });

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        // toast({
        //   title: "Success",
        //   description: "Note saved successfully",
        // });
      }
    } catch (err) {
      console.log(err);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to save note",
      // });
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

      <Card className="flex justify-center flex-col gap-2 items-center bg-gray-50 border-none shadow-none hover:shadow-none py-14 max-w-[900px]">
        <input
          type="text"
          value={note.title}
          name="title"
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
