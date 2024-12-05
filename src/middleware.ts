import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Skip paths that already include "/posts/"
  if (pathname.startsWith('/posts/')) {
    return NextResponse.next();
  }

  // Skip paths that are not "slug-like" (e.g., static pages)
  if (!pathname.match(/^\/[\w-]+$/)) {
    return NextResponse.next();
  }

  // Rewrite the request to include the "/posts/" prefix
  const newPathname = `/posts${pathname}`;
  return NextResponse.redirect(new URL(newPathname, request.url));
}

export const config = {
  matcher: ['/posts/:path*', '/:slug', '/'],
};
