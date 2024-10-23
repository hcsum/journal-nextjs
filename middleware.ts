import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth";

export async function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl.pathname);
  return authMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
