import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Redirect to strip the default locale prefix from the URL
  // e.g. /en -> /
  // e.g. /en/about -> /about
  if (pathname === `/${defaultLocale}`) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, 307)
  }

  if (pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1)
    return NextResponse.redirect(url, 307)
  }

  // 2. Check if the URL has any locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 3. If there is no locale prefix (and we aren't handling an excluded static/API path),
  // rewrite internally to the default locale.
  // e.g. /about -> /en/about
  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all API routes (/api)
    // Skip Payload admin panel (/admin)
    // Skip static files with extensions (e.g. svg, png, jpg, favicon.ico)
    '/((?!api|_next/static|_next/image|admin|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
