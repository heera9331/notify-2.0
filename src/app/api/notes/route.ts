import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const POST = async (req: NextRequest) => {
  const { title, content, parentId, userId, isPublic, category } = req.body;
  console.log(req);
  /// console.log(req.body);
  // Validate required fields
  if (!title || !content || !userId) {
    return NextResponse.json(
      {
        error: "Title, content, and userId are required.",
      },
      { status: 400 }
    );
  }

  try {
    // Create the note in the database
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        parentId: parentId || 0, // Default to root if parentId is not provided
        userId: Number(userId), // Ensure userId is a number
        isPublic: Boolean(isPublic), // Ensure isPublic is a boolean
        category: category || null, // Category is optional
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);

    NextResponse.json({ error: "Failed to create note." }, { status: 500 });
  }
};

const GET = async () => {
  try {
    // Fetch all notes
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 400 }
    );
  }
};

export { GET, POST };
