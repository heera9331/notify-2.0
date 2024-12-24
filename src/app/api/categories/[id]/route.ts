import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Define a type for request params
interface GetParams {
  params: {
    id: string;
  };
}

interface GetProps {
  id: string;
}

// GET endpoint to fetch children of a category
const GET = async (req: NextRequest, params: GetProps) => {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid parentId" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { id },
    });

    return NextResponse.json({ category });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
};

interface PutProps {
  params: {
    id: string;
  };
}

const PUT = async (req: NextRequest, { params }: PutProps) => {
  try {
    const { id } = await params;

    // Ensure ID is provided and valid.
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: "Invalid ID. ID must be a number." },
        { status: 400 }
      );
    }

    // Parse the JSON body.
    const { title, description, parentId } = await req.json();

    // Validate required fields.
    // if (!title || !description) {
    //   return NextResponse.json(
    //     { error: "Title and description are required." },
    //     { status: 400 }
    //   );
    // }

    // Update the category in the database using Prisma.
    const category = await prisma.category.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        parentId, // Assuming `parentId` is optional and nullable.
      },
    });

    // Return the updated category as a response.
    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating category:", error);

    // Handle known Prisma errors if required.
    if (error.code === "P2025") {
      // `P2025` refers to a Prisma "Record not found" error.
      return NextResponse.json(
        { error: "Category not found for the given ID." },
        { status: 404 }
      );
    }

    // Fallback for unhandled errors.
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
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

interface DeleteParams {
  params: {
    id: string;
  };
}

const DELETE = async (req: NextRequest, { params }: DeleteParams) => {
  try {
    const id = parseInt(params.id);

    if (!id) {
      return NextResponse.json({ error: "id not found" }, { status: 404 });
    }

    const category = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ category });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
};

export { GET, POST, PUT, DELETE };
