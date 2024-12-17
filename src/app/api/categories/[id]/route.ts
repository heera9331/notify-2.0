import { axios } from "@/lib/axios";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface getParams {
  id: string;
}

const GET = async (req: NextRequest, params: getParams) => {
  try {
    const category = params.id ?? 0;

    return NextResponse.json({ category });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
};

const PUT = async (req: NextRequest, params: getParams) => {
  try {
    const id = parseInt(params.id);

    if (!id) {
      return NextResponse.json({ error: "id not found" }, { status: 404 });
    }

    const { title, description } = await req.json();

    const category = await prisma.category.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({ category });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
};

const POST = async (req: NextRequest) => {
  try {
    const { title, description } = await req.json();

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

export { GET, POST, PUT };
