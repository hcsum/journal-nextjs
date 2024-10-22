import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth";

export async function middleware(request: NextRequest) {
  return authMiddleware(request);
}
