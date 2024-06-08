// import { NextRequest, NextResponse } from "next/server";
// import {
//   authMiddleware,
//   redirectToHome,
//   redirectToLogin,
// } from "next-firebase-auth-edge";
// import { firebaseConfig, serverConfig } from "./app/firebase/config";

// const PUBLIC_PATHS = ["/signin", "/about", "/signup", "/"];

// export async function middleware(request: NextRequest) {
//   return authMiddleware(request, {
//     loginPath: "api/signin",
//     logoutPath: "api/logout",
//     apiKey: firebaseConfig.apiKey,
//     cookieName: serverConfig.cookieName,
//     cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//     cookieSerializeOptions: serverConfig.cookieSerializeOptions,
//     serviceAccount: serverConfig.serviceAccount,
//     handleValidToken: async ({ token, decodedToken }, headers) => {
//       // Authenticated user should not be able to access /login, /register and /reset-password routes
//       if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
//         return redirectToHome(request);
//       }

//       return NextResponse.next({
//         request: {
//           headers,
//         },
//       });
//     },
//     handleInvalidToken: async (reason) => {
//       console.info("Missing or malformed credentials", { reason });
//       console.log(reason);
//       return redirectToLogin(request, {
//         path: "/signin",
//         publicPaths: PUBLIC_PATHS,
//       });
//     },
//     handleError: async (error) => {
//       console.error("Unhandled authentication error", { error });

//       return redirectToLogin(request, {
//         path: "/signin",
//         publicPaths: PUBLIC_PATHS,
//       });
//     },
//   });
// }

// // export async function middleware(request: NextRequest) {
// //   return authMiddleware(request, {
// //     loginPath: "/api/signin",
// //     logoutPath: "/api/logout",
// //     apiKey: firebaseConfig.apiKey,
// //     cookieName: "AuthToken",
// //     cookieSignatureKeys: serverConfig.cookieSignatureKeys,
// //     cookieSerializeOptions: {
// //       path: "/",
// //       httpOnly: true,
// //       secure: false, // Set this to true on HTTPS environments
// //       sameSite: "lax" as const,
// //       maxAge: 12 * 60 * 60 * 24, // twelve days
// //     },
// //     serviceAccount: {
// //       projectId: firebaseConfig.projectId,
// //       clientEmail: serverConfig.clientEmail,
// //       privateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
// //     },
// //   });
// // }

// export const config = {
//   matcher: ["/((?!_next|api|.*\\.).*)", "/api/signin", "/api/logout,", "/feed"],
// };

import { type NextRequest, NextResponse } from "next/server";
import {
  HOME_ROUTE,
  ROOT_ROUTE_SIGNIN,
  ROOT_ROUTE_SIGNUP,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
} from "./constants";

const protectedRoutes = [HOME_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE_SIGNIN, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
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
