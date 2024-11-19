import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { title, content, parentId, userId, isPublic, category } =
      await req.json();

    if (!title || !userId) {
      return NextResponse.json(
        { error: "Title and userId are required." },
        { status: 400 }
      );
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        userId: Number(userId),
        isPublic: Boolean(isPublic),
      },
    });

    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note." },
      { status: 500 }
    );
  }
};

export const GET = async () => {
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
 
