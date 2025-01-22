import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from './app/utils/loginlib'



 
export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/task/create', '/task/edit/:path']
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const session = await getSession()

  if(isProtectedRoute && !session?.token)
  return NextResponse.redirect(new URL('/login', request.nextUrl))


    return NextResponse.next()


}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}