"use client";
import { usePathname } from "next/navigation";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu></SidebarMenu>
        <SidebarMenu className="gap-[24px] flex flex-col">
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="px-3 py-4 cursor-pointer w-[232px] h-[48px]"
            >
              <Link key={item.title} href={item.url} className="cursor-pointer">
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`cursor-pointer w-[232px] h-[48px] px-3 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive(item.url) ? "active-graidient" : ""
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span className="text-[16px]">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
