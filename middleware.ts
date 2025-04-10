import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Handle old URL format /CATEGORÍA/[name]
  if (pathname.startsWith("/CATEGORÍA/")) {
    const category = pathname.split("/")[2]
    return NextResponse.redirect(new URL(`/categoria/${category}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/CATEGORÍA/:path*"],
}
