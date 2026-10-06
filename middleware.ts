import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /console routes
  if (pathname.startsWith("/console")) {
    const session = request.cookies.get("subzo_session");

    if (!session || session.value !== "authorized") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/console/:path*"],
};
