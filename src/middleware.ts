import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export {default} from "next-auth/middleware";

//This function can be marked 'async' if using await inside

export async function middleware(request: NextRequest) {
  const token = await getToken({req:request});
  // console.log({token:token});
  const url = request.nextUrl;

  if(token && (
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify') ||
    url.pathname.startsWith('/')
  )){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.redirect(new URL('/', request.url))
};
 
//In matcher we pass the routes we want to protected from Public access
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}