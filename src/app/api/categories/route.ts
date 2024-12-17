import { axios } from "@/lib/axios";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const categories = await prisma.category.findMany({});
    return NextResponse.json(categories);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
};

const POST = async (req: NextRequest) => {
  try {
    const { title, description, parentId } = await req.json();

    console.log(title, description);

    if (!title) {
      return NextResponse.json(
        { error: "Title and userId are required." },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        title,
        description: description ?? "",
      },
    });

    return NextResponse.json({ note: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note." },
      { status: 500 }
    );
  }
};

export { GET, POST };
