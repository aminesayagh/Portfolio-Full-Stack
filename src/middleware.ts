// import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const middleware = createMiddleware(routing, {
  localeDetection: true
});

export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/images|favicon.ico|.*\\.(?:ico|jpg|jpeg|svg|css|mp4|js|png|woff|woff2|ttf|eot|webp|avif|pdf)$).*)"
  ]
};
