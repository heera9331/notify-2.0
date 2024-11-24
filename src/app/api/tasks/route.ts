import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  try {
    const { title, content, userId, status, dueDate } = await req.json();

    if (!title || !userId) {
      return NextResponse.json(
        { error: "title and userId missing" },
        { status: 404 }
      );
    }

    const newtask = await prisma.task.create({
      data: {
        title,
        content,
        userId,
        status,
        dueDate,
      },
    });

    return NextResponse.json({ task: newtask }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET, POST };
