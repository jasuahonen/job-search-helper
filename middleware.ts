import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_IPS = [
  '80.220.239.89',    // Laptop
  '193.166.164.192',  // Laptop VPN,
  '85.76.166.74',     // Phone Mobile Network
]

export function middleware(request: NextRequest) {
  // Skip middleware in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  const clientIp = request.ip ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')

  // Check if the IP is allowed
  if (!ALLOWED_IPS.includes(clientIp || '')) {
    return new NextResponse('Access Denied', {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication routes)
     * 2. /_next/* (Next.js internals)
     * 3. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api/auth|_next|favicon.ico|sitemap.xml).*)',
  ],
}