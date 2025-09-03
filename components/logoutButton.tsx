"use client";
import { signOutAccount } from "@/lib/actions/appwrite.action";
import React from "react";

const LogoutButton = () => {
  return (
    <div>
      <p onClick={() => signOutAccount()}>logOut</p>
    </div>
  );
};

export default LogoutButton;
