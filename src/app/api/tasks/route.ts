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

export { GET };
