import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import { account } from "../appwrite";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-[27px] ">
      <Navbar />
      {children}
    </div>
  );
};
export default RootLayout;
