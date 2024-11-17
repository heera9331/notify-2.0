import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const { name, email, userName, password } = await req.json();

    if (!userName || !password || !email) {
      return NextResponse.json(
        { error: "userName, email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: userName },
    });

    if (user) {
      return NextResponse.json(
        { error: "userName already exits" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username: userName,
        password: hashedPassword,
      },
    });

    // Remove the password from the user object before sending response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { POST };
