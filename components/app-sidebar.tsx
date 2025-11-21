"use client";

import * as React from "react";
import {
  IconChartBar,
  IconHelp,
  IconInnerShadowTop,
  IconSettings,
  IconUpload,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { HomeIcon, LogOut, Upload, UserRound } from "lucide-react";
import { signOutAccount } from "@/lib/actions/appwrite.action";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },

    {
      title: "My videos",
      url: "/my-videos",
      icon: IconChartBar,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserRound,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
  navFooter: [
    {
      title: "Upload Video",
      url: "/videos/upload",
      icon: IconUpload,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="">
              <div>
                <IconInnerShadowTop className="!size-5" />
                <span className="dark:text-white font-medium text-2xl ">
                  Scout<span className="text-[#FF7000]">Hub</span>
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 "
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button className="px-4 py-3">
          <Upload className="!size-4" />
          <Link href="/videos/upload">Upload Video</Link>
        </Button>
        <Button
          className="px-4 py-3 dark:bg-white dark:text-black cursor-pointer"
          onClick={() => signOutAccount()}
        >
          <LogOut className="!size-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
