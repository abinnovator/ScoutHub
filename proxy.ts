import { NextResponse } from "next/server";
import auth from "./auth";

export async function proxy(request: {
  cookies: { delete: (arg0: string) => void };
  url: string | URL | undefined;
}) {
  const user = await auth.getUser();
  if (!user) {
    request.cookies.delete("session");

    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
