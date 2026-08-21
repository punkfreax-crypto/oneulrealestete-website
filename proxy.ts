import { NextRequest, NextResponse } from "next/server";

const LANDING_HOSTS = ["oneulrealestateagent.co.kr", "www.oneulrealestateagent.co.kr"];

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";

  if (LANDING_HOSTS.includes(host) && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/landing";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
