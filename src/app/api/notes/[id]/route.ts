import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    let { id } = params;
    let intId = Number(id);
    // Fetch all notes
    const notes = await prisma.note.findUnique({ where: { id: intId } });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 400 }
    );
  }
};

export { GET };
