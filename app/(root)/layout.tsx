import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import { account } from "../appwrite";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { div } from "@tensorflow/tfjs";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-[27px] ">
      <Navbar />

      {children}
      <Toaster />
    </div>
  );
};
export default RootLayout;
