"use server";
import { account, databases, ID } from "@/app/appwrite";
import { createAdminClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}
export async function signUp({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  const { databases } = await createAdminClient();
  try {
    const session = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    const promise = databases.createRow(
      "68b3e1e60033053f3c65", // databaseId
      "users", // collectionId
      session.$id,
      { email: email, username: username }
    );
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}
export async function createSession({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);
  (await cookies()).set("session", session.secret, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(session.expire),
    path: "/",
  });

  redirect("/");
}

export async function createVideo(file, name, category) {
  const { storage } = createAdminClient();
  const promise = await storage.createFile({
    bucketId: "68b3f64c003898913ac8",
    fileId: ID.unique(),
    file: file,
  });
}
// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const { account } = await createAdminClient();
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

// export const signIn = async ({ email, password }: signInProps) => {
//   try {
//     const { account } = await createAdminClient();

//     // Creating a session
//     const response = await account.createEmailPasswordSession(email, password);

//     // Check if the response contains the session token
//     if (!response) {
//       throw new Error("Session creation failed");
//     }

//     // Set the session in cookies
//     (await
//       // Set the session in cookies
//       cookies()).set("appwrite-session", response.secret, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//     });

//     return parseStringify(response); // Return parsed response
//   } catch (error) {
//     console.error("Error while signing in:", error);
//     return { error: "Failed to create session", details: error };
//   }
// };
