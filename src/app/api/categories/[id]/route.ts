import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Define a type for request params
interface GetParams {
  params: {
    id: string;
  };
}

// GET endpoint to fetch children of a category
const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const parentId = parseInt(params.id);
    console.log(parentId);
    if (isNaN(parentId)) {
      return NextResponse.json({ error: "Invalid parentId" }, { status: 400 });
    }

    const subcategories = await prisma.category.findMany({
      where: { parentId },
    });

    return NextResponse.json({ categories: subcategories });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
};

const PUT = async (req: NextRequest, params: any) => {
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

