import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { errorLog } from "@/utils/errorLog";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const POST = async (req: NextRequest) => { 
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Username not found" },
        { status: 404 }
      );
    }

    // Compare password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Remove the password from the user object before sending response
    const { password: _, ...userWithoutPassword } = user;

    // Return success response with token and user details
    return NextResponse.json({
      message: "Authentication successful",
      token,
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
