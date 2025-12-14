"use client";

import { signOut } from "next-auth/react";

export function useLogout() {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/signin",
      redirect: true,
    });
  };

  return handleLogout;
}
