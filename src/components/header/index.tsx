"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./components/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./components/navigation-menu";
import { User as UserIcon, LogOut, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth-options";
import { DATA_API } from "@/config/constants";
import { companyMenuItems, MenuItem, orgMenuItems } from "./components/type";
import Link from "next/link";

type ListItemProps = {
  title: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export default function Header({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { data } = useSession();

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (localTheme === "dark" || (!localTheme && systemTheme === "dark")) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  const accessToken = data?.user?.access_token;
  const sessiondata = data?.user as CustomUser;
  const [logoutstatus, setLogoutstatus] = useState(false);

  useEffect(() => {
    if (logoutstatus) {
      document.body.classList.add("loading-progress");
    } else {
      document.body.classList.remove("loading-progress");
    }
  }, [logoutstatus]);

  const logoutbtn = async () => {
    setLogoutstatus(true);
    try {
      const res = await fetch(`${DATA_API}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // Clear Zustand stores on logout
      if (typeof window !== "undefined") {
        const { useTemplateStore } = await import("@/store/use-template-store");
        useTemplateStore.getState().clearStore();
      }
      
      if (res.status === 200) {
        signOut({
          callbackUrl: "/signin",
          redirect: true,
        });
      }
      if (res.status === 500 || res.status === 400 || res.status === 401) {
        signOut({
          callbackUrl: "/signin",
          redirect: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLogoutstatus(false);
    }
  };

  const menufinal: MenuItem[] =
    sessiondata?.role === "superadmin" ? orgMenuItems : companyMenuItems;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 mx-auto justify-between">
          {/* Left Side: Logo & Main Navigation */}
          <div className="flex items-center gap-6">
            <a
              className="flex items-center space-x-2 font-bold text-xl mr-4"
              href="/"
            >
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-lg">R</span>
              </div>
              <span className="hidden lg:inline-block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                RadixGenAI
              </span>
            </a>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {menufinal.map((item) =>
                  item.type === "link" ? (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          className={`${navigationMenuTriggerStyle} capitalize`}
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuTrigger className="capitalize">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <ListItem
                              key={child.name}
                              title={child.name}
                              href={child.href}
                            >
                              {child.desc}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side: Theme Toggle & User Avatar */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              {theme === "dark" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* User Dropdown (Standard Dropdown Menu) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105">
                  <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    {sessiondata?.role === "company"
                      ? sessiondata?.profile?.company_name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                      : sessiondata?.profile?.username
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sessiondata?.role === "company"
                        ? sessiondata?.profile?.company_name
                        : sessiondata?.profile?.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground opacity-70">
                      {sessiondata?.profile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logoutbtn()}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
