import NextAuth from "next-auth";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth-options";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends CustomUser {}
}
