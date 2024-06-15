import { type NextRequest, NextResponse } from "next/server";
import {
  HOME_ROUTE,
  ROOT_ROUTE_SIGNIN,
  ROOT_ROUTE_SIGNUP,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
  ONBOARDING_ROUTE,
  PROFILE_ROUTE,
} from "./constants";

const protectedRoutes = [HOME_ROUTE, ONBOARDING_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE_SIGNIN, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (!session && request.nextUrl.pathname === ONBOARDING_ROUTE) {
    const absoluteURL = new URL(ROOT_ROUTE_SIGNIN, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  function getParams(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search);
    return params.get("slug");
  }

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === ROOT_ROUTE_SIGNIN) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (session && request.nextUrl.pathname === ROOT_ROUTE_SIGNUP) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
