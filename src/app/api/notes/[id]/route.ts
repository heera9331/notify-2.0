import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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
      return NextResponse.json(
        { error: "Note not found." },
        { status: 404 }
      );
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
};

export { GET };
