// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // Extract the token

    try {
      // Decode the JWT token
      const decoded = jwt.verify(token, SECRET_KEY) as {
        id: string;
        username: string;
      };
      console.log("Decoded JWT:", decoded);

      // Add user information to custom headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decoded.id);
      requestHeaders.set("x-username", decoded.username);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.json(
        { message: "Unauthorized: Invalid Token" },
        { status: 401 }
      );
    }
  }

  // If no Authorization header
  return NextResponse.json(
    { message: "Unauthorized: No Token Provided" },
    { status: 401 }
  );
}

// Apply the middleware to API routes only
export const config = {
  matcher: "/api/:path*",
};
