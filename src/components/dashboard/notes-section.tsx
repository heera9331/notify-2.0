"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Notebook, Plus, Save, StickyNote, X } from "lucide-react";
import NoteEditor from "@/components/note-editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useNotes } from "@/hooks/use-notes";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

export function NotesSection() {
  const { notes } = useNotes();
  const router = useRouter();

  const handleNewNote = () => {
    router.push("/notes/0?action=new");
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Quick Notes</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleNewNote}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push(`/notes/`);
            }}
          >
            <Notebook className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 pr-4">
          {notes.map((note) => (
            <button
              key={note.id}
              className="w-full text-left"
              onClick={() => {
                router.push(`/notes/${note.id}?action=new`);
              }}
            >
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100">
                    {note.title}
                  </h3>
                  <span className="text-xs text-yellow-700 dark:text-yellow-300">
                    {new Date(note.createdAt).toLocaleDateString().toString()}
                  </span>
                </div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 line-clamp-2">
                  {note.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
