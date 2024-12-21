import { axios } from "@/lib/axios";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    // Fetch categories with their subcategories (children)
    const categories = await prisma.category.findMany({
      where: {
        parentId: null, // Fetch only top-level categories
      },
      include: {
        children: true, // Include subcategories recursively
      },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
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
        parentId,
      },
    });

    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note." },
      { status: 500 }
    );
  }
};

export { GET, POST };
