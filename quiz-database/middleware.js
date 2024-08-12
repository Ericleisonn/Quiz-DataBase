import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  // Define paths that are considered public (accessible without a token)
  const isPublicPath = path === '/user/login/page' || path === '/user/signup/page' || path === '/user/verifyemail/page'

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || ''

  console.log('token: ', token)

  // Redirect logic based on the path and token presence
  if(isPublicPath && token) {

 // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

// If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/user/login/page', request.nextUrl))
  }
    
}

// It specifies the paths for which this middleware should be executed. 
// In this case, it's applied to '/', '/profile', '/login', and '/signup'.
export const config = {
  matcher: [
    '/',
    '/user/profile/page',
    '/user/login/page',
    '/user/signup/page',
    '/user/verifyemail/page',
    '/t'
  ]
}