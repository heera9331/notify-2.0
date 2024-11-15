import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

const GET = async () => {};

const POST = async (req: NextRequest, res: NextResponse) => {
  const { title, content, postType, userId } = req.body;

  if (!title || !content || !postType || !userId) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        postType,
        userId: Number(userId),
      },
    });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json(
      { error: "Failed to create post." },
      { status: 500 }
    );
  }
};

export { GET, POST };
