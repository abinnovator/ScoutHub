"use client";
import { useState } from "react";
import { account } from "../../appwrite";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
// import { loginWithEmailAndPassword, createSession } from "@/lib/actions/appwrite.action";
import Link from "next/link";

import { createSession } from "@/lib/actions/appwrite.action";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  // async function createSession({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) {
  //   "use server";
  //   const { account } = await createAdminClient();
  //   const session = await account.createEmailPasswordSession(email, password);
  //   (await cookies()).set("session", session.secret, {
  //     httpOnly: true,
  //     sameSite: "strict",
  //     secure: true,
  //     expires: new Date(session.expire),
  //     path: "/",
  //   });

  //   redirect("/");
  // }
  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const currentUser = await account.get();
  //       if (currentUser) {
  //         console.log(currentUser);
  //         redirect("/");
  //       }
  //     } catch (error) {
  //       console.error("No active user session found:", error);
  //       setLoggedInUser(null);
  //     }
  //   };
  //   checkUser();
  // }, [router]);

  // const login = async (email, password) => {
  //   const loggedIn = await loginWithEmailAndPassword({ email, password });
  //   if (loggedIn.success) {
  //     try {
  //       const currentUser = await account.get();
  //       setLoggedInUser(currentUser); // Update state
  //       router.push("/"); // Use client-side navigation
  //     } catch (e) {
  //       console.error("Error fetching user after login", e);
  //     }
  //   } else {
  //     console.log("There was an error");
  //   }
  // };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  return (
    <div className="  w-screen h-screen flex flex-row items-center justify-center gap-[-3]">
      {/* bg-linear-to-r from-[#AC72A1] via-[#FBD9FA] to-[#070E2A] */}
      {/* <Image src="/Rectangle 1.png" alt="football" width={596} height={661} /> */}
      <div className="backdrop-blur-[87.5px] px-[292px] bg-[#D9D9D9]/10 rounded-[55] py-[56px] flex flex-col gap-5 drop-shadow-lg border-black border-2 ">
        <div className="flex flex-col gap-5">
          <h1 className="text-[27px] font-extrabold text-center">
            Sign In to ScoutHub
          </h1>
          <p>Welcome Back! Sign in to ScoutHub to continue.</p>
        </div>
        <form className="flex flex-col gap-9 text-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-black border-b-2 pb-1"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-black border-b-2 pb-1"
          />
          {/* <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-black border-b-2 pb-1"
          /> */}
          <Button
            type="button"
            onClick={() => createSession({ email, password })}
          >
            Login
          </Button>
          {/* <Button type="button" onClick={() => logout()}>
            Log Out
          </Button> */}
          <p>
            Dont have an account? <Link href="/sign-up">Sign Up</Link>
          </p>
          {/* <Button type="button" onClick={register}>
            Register
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
