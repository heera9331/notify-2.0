/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const GET = async (req: NextRequest, { params }) => {
  try {
    console.log(params);
    // Fetch all notes
    const notes = await prisma.note.findUnique({ where: { id: 10 } });
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
