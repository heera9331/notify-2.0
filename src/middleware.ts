// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

console.log("middleware");

export async function middleware(request: NextRequest) {
  // JWT Authentication Middleware
  if (request.url.includes("/api/auth")) {
    return NextResponse.next();
  }

  if (request.url.includes("/api")) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]; // Extract the token
      try {
        const decoded = jwt.verify(token, SECRET_KEY) as {
          id: string;
          username: string;
        };

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", decoded.id);
        requestHeaders.set("x-username", decoded.username);

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "Unauthorized: Invalid Token" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { message: "Unauthorized: No Token Provided" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
