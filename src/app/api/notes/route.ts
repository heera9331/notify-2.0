import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { title, content, parentId, userId, isPublic, category } =
      await req.json();

    console.log(title, content);

    if (!title || !userId) {
      return NextResponse.json(
        { error: "Title and userId are required." },
        { status: 400 }
      );
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        content: JSON.stringify(content),
        userId: Number(userId),
        isPublic: Boolean(isPublic),
        category: category.toString(),
      },
    });

    return NextResponse.json({ note: newNote }, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note." },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const s = params.get("s") ?? "";
    const category = params.get("category")
      ? Number(params.get("category"))
      : null;
    const page = Math.max(Number(params.get("page")) || 1, 1);
    const limit = Math.max(Number(params.get("limit")) || 10, 1);

    // Fetch notes with optional filtering by category
    const notes = await prisma.note.findMany({
      where: {
        ...(category && { category: category.toString() }),
        ...(s && {
          OR: [{ title: { contains: s } }, { content: { contains: s } }],
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Return notes
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 400 }
    );
  }
};
