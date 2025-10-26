import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Проверяем наличие куки (например, auth-token)
  const authToken = request.cookies.get('auth-token')
  // Если куки нет и пользователь на защищенной странице
  if (!authToken && request.nextUrl.pathname.startsWith('/admin')) {
    // Редирект на логин
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!authToken && request.nextUrl.pathname.startsWith('/profile')) {
    // Редирект на логин
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
  ],
}