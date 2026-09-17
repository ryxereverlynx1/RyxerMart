import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "ryxermart-dev-secret-key-32-chars-long-local-auth-test-2026";
const encodedSecret = new TextEncoder().encode(SESSION_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login page)
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    // If logged-in user visits /admin/login, redirect to /admin dashboard
    if (pathname === "/admin/login") {
      const token = request.cookies.get("ryxermart_admin_session")?.value;
      if (token) {
        try {
          await jwtVerify(token, encodedSecret);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
          // Token invalid, proceed to login
        }
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get("ryxermart_admin_session")?.value;

  if (!token) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    const role = payload.role as string;

    // Strict role check for sensitive admin routes
    const isSensitiveAdminRoute =
      pathname.startsWith("/admin/settings") ||
      pathname.startsWith("/admin/chatbot") ||
      pathname.startsWith("/api/admin/settings") ||
      pathname.startsWith("/api/admin/chatbot");

    if (isSensitiveAdminRoute && role !== "ADMIN") {
      if (isAdminApi) {
        return NextResponse.json(
          { error: "Forbidden: Admin privilege required" },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL("/admin?error=forbidden", request.url));
    }

    // Attach user information headers to downstream handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-id", payload.id as string);
    requestHeaders.set("x-admin-email", payload.email as string);
    requestHeaders.set("x-admin-role", role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
