import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth-options";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signin";
  const isRootPath = path === "/";

  const token = await getToken({ req: request });
  console.log("🔑 Token:", token);

  // 🚫 Not logged in and trying to access a private route
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 🏠 Logged in and visiting root or signin page
  if ((isRootPath || isPublicPath) && token) {
    if (token.role === "superadmin") {
      return NextResponse.redirect(new URL("/organization", request.url));
    } else if (token.role === "company") {
      return NextResponse.redirect(new URL("/company", request.url));
    }
  }

  const user = token as CustomUser;

  // 🛡 Role-based protection
  if (
    request.nextUrl.pathname.startsWith("/organization") &&
    user?.role !== "superadmin"
  ) {
    return NextResponse.redirect(
      new URL("/signin?message=You Are Not Authorized!", request.url)
    );
  }

  if (
    request.nextUrl.pathname.startsWith("/company") &&
    user?.role !== "company"
  ) {
    return NextResponse.redirect(
      new URL("/signin?message=You Are Not Authorized!", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/company/:path*", "/organization/:path*"],
};
