import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
  const adminAuth = request.cookies.get("adminAuth")?.value;
  if (adminAuth !== "true") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
