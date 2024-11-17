import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({});
    return NextResponse.json({ posts });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }
};

const POST = async (req: NextRequest) => {
  const { title, content, postType, userId } = await req.json();

  console.log({ title, content, postType, userId });

  if (!title || !postType || !userId) {
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
