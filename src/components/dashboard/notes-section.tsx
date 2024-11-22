
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, StickyNote, X } from "lucide-react";
import NoteEditor from "@/components/note-editor";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Project Requirements",
    content: "Review and update the project requirements documentation for the new feature release.",
    date: "2 hours ago"
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Team sync: Discussed upcoming sprint goals and resource allocation.",
    date: "Yesterday"
  },
  {
    id: 3,
    title: "Ideas",
    content: "Implement dark mode toggle and improve accessibility features.",
    date: "2 days ago"
  }
];

export function NotesSection() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Quick Notes</h2>
        </div>
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleNewNote}>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                {selectedNote ? "Edit Note" : "New Note"}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full pr-4">
              <NoteEditor
                id={selectedNote?.id}
                initialNote={selectedNote}
                key={selectedNote?.id || 'new'}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 pr-4">
          {notes.map((note) => (
            <button
              key={note.id}
              className="w-full text-left"
              onClick={() => handleNoteClick(note)}
            >
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100">
                    {note.title}
                  </h3>
                  <span className="text-xs text-yellow-700 dark:text-yellow-300">
                    {note.date}
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