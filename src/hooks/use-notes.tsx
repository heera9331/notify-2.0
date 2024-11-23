"use client";
import { Note } from "@prisma/client";
import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      const notes = response.data;
      setNotes(notes);
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.log(error);
    }
  };

  const getNote = (id: number) => {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        return notes[i];
      }
    }

    return null;
  };

  const updateNote = (newNote: Note) => {
    console.log("put api request");
    setNotes([...notes, newNote]);
    console.log(newNote);
  };

  const deleteNote = (id: number) => {
    console.log("delete api request");
    console.log(id);
  };

  return { notes, setNotes, getNote, updateNote, deleteNote };
}
