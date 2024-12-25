import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Correctly typed handler for API route
export async function GET(
  req: NextRequest,
  props: { params: Promise<Record<string, string>> }
) {
  const params = await props.params;
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert ID to an integer

    // Validate the ID
    if (isNaN(intId)) {
      return NextResponse.json(
        { error: "Invalid note ID provided." },
        { status: 400 }
      );
    }

    // Fetch the note by ID
    const note = await prisma.note.findUnique({
      where: { id: intId },
    });

    // Check if the note exists
    if (!note) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }

    // Return the note data
    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("Error fetching note:", error);

    // Handle any server errors
    return NextResponse.json(
      { error: "Failed to fetch note." },
      { status: 500 }
    );
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) => {
  const params = await props.params;
  const { id } = params;

  try {
    const deletedNote = await prisma.note.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedNote);
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

interface Params {
  params: Promise<{ id: string }>;
}

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const id = parseInt((await params).id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid note ID provided." },
        { status: 400 }
      );
    }
    const { title, content, category } = await req.json();
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content: JSON.stringify(content),
        category,
      },
    });

    if (updatedNote) {
      return NextResponse.json({ note: updatedNote, message: "Note updated" });
    }

    return NextResponse.json(
      { error: "Error while updating note" },
      { status: 500 }
    );
  } catch (error) {
    console.log("Note update error> ", error);
    return NextResponse.json(
      { error: "Error while updating note" },
      { status: 500 }
    );
  }
};
