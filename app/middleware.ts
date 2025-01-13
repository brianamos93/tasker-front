import type { NextRequest } from 'next/server'
import { updateSession } from './utils/loginlib'

const protectedRoutes = ['/task/create', '/task/edit/']
const publicRoutes = ['']
 
export async function middleware(request: NextRequest) {
  await updateSession(request)
  //const currentUser = request.cookies.get('session')?.value
 
  //if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    //return Response.redirect(new URL('/dashboard', request.url))
  //}
 
  //if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    //return Response.redirect(new URL('/login', request.url))
  //}
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}