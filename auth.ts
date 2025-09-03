import { cookies } from "next/headers";
import { createSessionClient } from "./appwrite/config";
import { User } from "node-appwrite";

const auth = {
  user: null,
  sessionCookie: null,

  getUser: async (): Promise<User | null> => {
    // Check if the cookie exists before trying to get its value
    const auth_sessionCookie = (await cookies()).get("session");

    if (!auth_sessionCookie) {
      auth.user = null;
      return null;
    }

    try {
      const { account } = await createSessionClient(auth_sessionCookie.value);
      auth.user = await account.get();
      return auth.user;
    } catch (error) {
      console.error("Error getting user:", error);
      auth.user = null;
      return null;
    }
  },
};

export default auth;
