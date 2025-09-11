import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { account } from "@/app/appwrite";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import auth from "@/auth";
import LogoutButton from "./logoutButton";
import { signOutAccount } from "@/lib/actions/appwrite.action";

const Navbar = async () => {
  const user = await auth.getUser();
  const logout = async () => {
    await signOutAccount();
  };
  return (
    <div className="py-2 ">
      <div className="flex flex-row justify-between border-b border-b-[#D9D9D9] px-5 items-center w-full overflow-x-hidden overflow-y-hidden max-h-[64px]">
        <div className="flex flex-row gap-2">
          <Link href="/">
            <Image
              src="/logo_size.jpg"
              alt="scouthub logo"
              width={111}
              height={190}
            />
          </Link>
        </div>

        <div className="md:flex md:flex-row md:gap-[40px] hidden">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>

          {/* <Link href="/feedback">Feedback</Link> */}
          <Link href="/profile">Profile</Link>

          {/* <Link href="/dashboard">Dashboard</Link> */}
        </div>
        <div className="flex flex-row gap-[11px]  text-center justify-center items-center">
          <p className="hidden md:flex">{user?.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Image
                src="https://cloud.appwrite.io/v1/avatars/initials?name=A+B&width=192&height=192&project=console"
                alt=""
                height={50}
                width={50}
                className="rounded-[300px]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
