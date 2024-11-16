import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const tasks = await prisma.post.findMany({
      where: {
        postType: "TASK",
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
    const { title, content, postType, userId } = await req.json();

    if (!title || !userId) {
      return NextResponse.json(
        { error: "title and userId missing" },
        { status: 404 }
      );
    }

    const newTask = await prisma.post.create({
      data: {
        title,
        content,
        postType,
        userId,
      },
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET, POST };
