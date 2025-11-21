"use client";

import React from "react";
import Link from "next/link";
import { IconLogout, IconUpload } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

type NavFooterProps = {
  onLogout?: () => void;
  className?: string;
};

const NavFooter: React.FC<NavFooterProps> = ({ onLogout, className }) => {
  return (
    <SidebarGroup className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="px-4 py-3">
              <SidebarMenuButton asChild>
                <Link href="/videos/upload">
                  <IconUpload className="!size-4" />
                  <span>Upload Video</span>
                </Link>
              </SidebarMenuButton>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {onLogout ? (
              <SidebarMenuButton onClick={onLogout}>
                <IconLogout className="!size-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild>
                <Link href="/logout">
                  <IconLogout className="!size-4" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavFooter;
