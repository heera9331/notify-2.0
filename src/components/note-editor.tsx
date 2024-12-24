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
import { toast } from "sonner";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { title } from "process";
import { Input } from "./ui/input";

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
  const { user, categories } = useUser();
  const [category, setCategory] = useState<number | null>(null);

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
        category,
      };

      const response = await axios({
        method: note.id ? "put" : "post",
        url: note.id ? `/api/notes/${note.id}` : "/api/notes",
        data: payload,
      });

      console.log("Saved note:", response.data);
      toast.success("Note saved");
    } catch (err) {
      console.error("Error saving note:", err);
      toast.error("Failed to save note");
    } finally {
      setLoading(false);
      toast.error("Failed to save note , try again later");
    }
  };

  return (
    <>
      <div className="w-full flex justify-start mb-4">
        <Button onClick={saveNote} disabled={loading} className="gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save
        </Button>
      </div>

      <div className="flex w-full gap-4">
        <Card className="w-3/4 flex justify-center flex-col gap-2 items-center bg-white border-none shadow-none py-14 max-w-[900px]">
          <input
            type="text"
            value={note.title}
            onChange={handleTitleChange}
            className="w-[80%] py-2 bg-gray-50 text-3xl font-bold active:focus:bg-white focus:outline-none"
            placeholder="Set note title"
          />
          <div className="w-[80%]">
            <div
              id={EDITOR_HOLDER_ID}
              className="prose prose-stone dark:prose-invert max-w-none"
            />
          </div>
        </Card>

        <div className="w-1/4 flex flex-col gap-4">
          <Card className=" bg-white">
            <div className="flex flex-col gap-2 min-h-[124px]">
              <Label className="font-semibold text-xl">Featured Image</Label>
              <Input type="file" name="featured_image" />
              <Button className="bg-gray-800 text-white">Save</Button>
            </div>
          </Card>

          <Card className=" bg-white">
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-xl">
                Select Note Category
              </Label>
              <Select
                value={category?.toString() || ""}
                onValueChange={(value) => setCategory(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Parent Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem
                      value={category.id.toString()}
                      key={category.id}
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Card className=" bg-white">
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-xl">Publish</Label>
              <Button className="bg-gray-800 text-white">Publish</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NoteEditor;
