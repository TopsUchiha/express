import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_BASE, ADMIN_COOKIE } from '@/lib/admin-path'

if (process.env.NODE_ENV === 'development') {
  console.log(ADMIN_BASE ? `[admin] panel is at ${ADMIN_BASE}` : '[admin] panel is OFF: ADMIN_PATH is missing or invalid (use 8+ characters: letters, digits, - _ /)')
}

/**
 * 1. Sets an enforcing Content-Security-Policy with a fresh nonce on every page request.
 * 2. Serves the admin panel only at the secret ADMIN_PATH. The real /admin routes return 404, and so does
 *    everything under the secret path unless the request carries an admin session cookie (no redirects).
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.mapbox.com",
    "font-src 'self' data:",
    `connect-src 'self' https://*.mapbox.com https://events.mapbox.com${isDev ? ' ws: wss:' : ''}`,
    "worker-src 'self' blob:",
    'child-src blob:',
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)
  requestHeaders.delete('x-admin')

  const { pathname } = request.nextUrl
  let response: NextResponse
  if (ADMIN_BASE && (pathname === ADMIN_BASE || pathname.startsWith(ADMIN_BASE + '/'))) {
    const rest = pathname.slice(ADMIN_BASE.length)
    if (rest === '' || rest === '/' || request.cookies.has(ADMIN_COOKIE)) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin' + (rest === '/' ? '' : rest)
      requestHeaders.set('x-admin', '1')
      response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
      response.headers.set('Cache-Control', 'no-store')
    } else {
      const url = request.nextUrl.clone()
      url.pathname = '/not-found-404'
      response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    }
  } else if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const url = request.nextUrl.clone()
    url.pathname = '/not-found-404'
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } })
  }
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  // Every page and prefetch request goes through the proxy so the admin path rewrite always applies.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|images/).*)'],
}
