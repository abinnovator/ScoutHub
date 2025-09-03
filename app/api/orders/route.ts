import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const sessionCookie = (await cookies()).get("session");
  try {
    const { databases } = await createSessionClient(sessionCookie?.value);
    const users = await databases.listRows("68b3e1e60033053f3c65", "users");
    return Response.json(users);
  } catch (e) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
