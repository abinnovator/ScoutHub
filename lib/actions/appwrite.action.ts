"use server";
import { account, databases, ID } from "@/app/appwrite";
import { createAdminClient, createSessionClient } from "@/appwrite/config";
import auth from "@/auth";
import { Query } from "appwrite";
import { error } from "console";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createVideoFeedback } from "./gemini.action";

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
  sport,
  coach,
}: {
  email: string;
  username: string;
  password: string;
  sport: string;
  coach: boolean;
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
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "users", // collectionId
      session.$id,
      { email: email, username: username, sport: sport, coach: coach }
    );
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: error };
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
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "videos", // collectionId
      ID.unique(),
      {
        title: name,
        userId: user.targets[0].userId,
        category: category,
        Description: description,
        storageId: promise.$id,
        name: user.name,
      }
    );
    // const updateProfile = databases.updateRow(
    //   process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
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
  auth.sessionCookie = (await cookies()).get("session");
  try {
    const { account } = await createSessionClient(auth.sessionCookie.value);
    await account.deleteSession("current");
  } catch (error) {}

  (await cookies()).delete("session");
  auth.user = null;
  auth.sessionCookie = null;
  redirect("/sign-in");
}
export async function listVideos() {
  try {
    const { storage, databases } = createAdminClient();
    const promise = await databases.listRows(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
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
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
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
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
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

// Create Feedback
export async function createTrainingFeedback({
  storageId,
  databaseId,
}: {
  storageId: string;
  databaseId: string;
}) {
  try {
    const { databases } = createAdminClient();
    const feedback = await createVideoFeedback({
      storageId: storageId,
    });
    const updatedDatabase = databases.updateRow({
      databaseId: process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      tableId: "videos", // collectionId
      rowId: databaseId,
      data: { feedback: feedback },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
export async function getVideoInfoById({ id }: { id: string }) {
  try {
    const { databases } = createAdminClient();
    const promise = await databases.getRow(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "videos",
      id
    );
    return { success: true, data: promise };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
