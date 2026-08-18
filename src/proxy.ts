import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
    name: string;
    id: string;
  };

  const headers = new Headers(request.headers);
  headers.set("Username", decoded.name);
  headers.set("userId", decoded.id);

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: ["/employee/:path*"],
};
