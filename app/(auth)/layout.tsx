import Navbar from "@/components/Navbar";
import { ReactNode, use } from "react";
import { account } from "../appwrite";
import { redirect } from "next/navigation";
import auth from "@/auth";
import { Toaster } from "sonner";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await auth.getUser();
  if (user) {
    redirect("/app");
  }

  return (
    <div className="">
      <Toaster />
      {children}
    </div>
  );
};
export default AuthLayout;
