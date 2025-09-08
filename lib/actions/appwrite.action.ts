"use server";
import { account, databases, ID } from "@/app/appwrite";
import { createAdminClient } from "@/appwrite/config";
import auth from "@/auth";
import { Query } from "appwrite";
import { error } from "console";
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
// Login
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
// Create Video

export async function createVideo({
  file,
  name,
  category,
  description,
}: {
  file: any;
  name: string;
  category: string;
  description: string;
}) {
  try {
    const { storage, databases } = createAdminClient();
    const promise = await storage.createFile({
      bucketId: "68b3f64c003898913ac8",
      fileId: ID.unique(),
      file: file,
    });
    const user = await auth.getUser();
    const updateVideos = await databases.createRow(
      "68b3e1e60033053f3c65", // databaseId
      "videos", // collectionId
      ID.unique(),
      {
        title: name,
        userId: user.targets[0].userId,
        category: category,
        description: description,
        storageId: promise.$id,
        name: user.name,
      }
    );
    // const updateProfile = databases.updateRow(
    //   "68b3e1e60033053f3c65", // databaseId
    //   "users", // collectionId
    //   user.targets[0].userId,
    //   {
    //     videos: [
    //       {
    //         title: name,
    //         category: category,
    //         descrition: description,
    //         storageId: promise.$id,
    //       },
    //     ],
    //   }
    // );
    console.log(promise);
    return { sucess: true };
  } catch (error) {
    console.log(error);
    return { sucess: false };
  }
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
export async function listVideos() {
  try {
    const { storage, databases } = createAdminClient();
    const promise = await databases.listRows(
      "68b3e1e60033053f3c65", // databaseId
      "videos" // collectionId
    );
    return { success: true, data: promise };
  } catch (e) {
    console.log(error);
    return { succes: false };
  }
}
export async function getVideoById({ id }: { id: string }) {
  try {
    const { storage } = createAdminClient();
    const promise = await storage.getFile({
      bucketId: "68b3f64c003898913ac8",
      fileId: id,
    });
    return { success: true, data: promise };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
// GetUserProfile
export async function getUserProfileByID({ id }: { id: string }) {
  try {
    const { databases } = await createAdminClient();
    const user = await databases.getRow(
      "68b3e1e60033053f3c65", // databaseId
      "users", // collectionId
      id
    );
    return { succes: true, data: user };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function listVideosbyCategoryAndUser({
  category,
  userId,
}: {
  category: string;
  userId: string;
}) {
  try {
    const { storage, databases } = createAdminClient();
    const promise = await databases.listRows(
      "68b3e1e60033053f3c65", // databaseId
      "videos",
      [
        // collectionId,
        (Query.equal("userId", userId), Query.equal("category", category)),
      ]
    );
    return { success: true, data: promise };
  } catch (e) {
    console.log(error);
    return { succes: false };
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
