"use client";
import { useEffect, useState } from "react";
import { account, ID } from "../../appwrite";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import router from "next/router";
import { redirect } from "next/navigation";
import {
  loginWithEmailAndPassword,
  signUp,
} from "@/lib/actions/appwrite.action";
import Link from "next/link";
import { toast } from "sonner";

const SignUp = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [coach, setCoach] = useState(false);

  const login = async (email, password) => {
    const loggedIn = await loginWithEmailAndPassword({ email, password });
    if (loggedIn.success) {
      try {
        const currentUser = await account.get();
        setLoggedInUser(currentUser); // Update state
        router.push("/"); // Use client-side navigation
      } catch (e) {
        console.error("Error fetching user after login", e);
      }
    } else {
      console.log("There was an error");
    }
  };

  const register = async () => {
    const signedUp = await signUp({
      email,
      username: name,
      password,
      sport: sport,
      coach: coach,
    });
    if (signedUp.success) {
      toast("Account has been created.");
      login(email, password);
      redirect("/");
    } else {
      console.log("There was an error");
      toast("there was an error");
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    redirect("/");
  }

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
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-black border-b-2 pb-1"
          />
          <input
            type="text"
            placeholder="Sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="border-b-black border-b-2 pb-1"
          />
          <div className="flex flex-row gap-2">
            <p>Are you a coach</p>
            <input
              type="checkbox"
              placeholder="Coach"
              value={coach}
              onChange={(e) => setCoach(e.target.checked)}
              className="border-b-black border-b-2 pb-1"
            />
          </div>

          <Button type="button" onClick={() => register()}>
            Sign Up
          </Button>
          {/* <Button type="button" onClick={register}>
            Register
          </Button> */}
          <p>
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
