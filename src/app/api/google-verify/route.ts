import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Dynamic Google Search Console verification endpoint.
 * When Google Search Console tests HTML file verification, it visits:
 * https://ryxer.site/google<hash>.html
 * Google expects a 200 OK response with the exact body:
 * "google-site-verification: google<hash>.html"
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get("file") || "";

  // Validate format matches Google Search Console's HTML verification pattern
  if (/^google[a-zA-Z0-9_-]+\.html$/.test(file)) {
    return new NextResponse(`google-site-verification: ${file}`, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  return new NextResponse("Not Found", { status: 404 });
}
