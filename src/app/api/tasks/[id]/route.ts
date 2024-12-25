import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch a single task by ID
const GET = async (req: NextRequest, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;

  try {
    const task = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// PATCH: Update a task by ID
const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedTask = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        content: body.content,
        postType: body.postType,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("PATCH Error:", error);
    // if (error.code === "P2025") {
    //   // Prisma record not found error
    //   return NextResponse.json({ error: "Task not found" }, { status: 404 });
    // }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// DELETE: Delete a task by ID
const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error("DELETE Error:", error);
    // if (error.code === "P2025") {
    // return NextResponse.json({ error: "Task not found" }, { status: 404 });
    //   // Prisma record not found error
    // }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET, PUT, DELETE };
