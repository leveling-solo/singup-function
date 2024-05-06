import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path: string = request.nextUrl.pathname;

  const isPublicPath: boolean =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/resetPassword";

  const token: string = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See matching Paths below to learn more

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/resetPassword",
  ],
};
