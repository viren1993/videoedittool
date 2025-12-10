"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";

import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { DATA_API } from "@/config/constants";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function Signin() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setErrorMsg(null);
    setLoading(true);

    try {
      // 1. Authenticate with custom backend
      const login = await fetch(`${DATA_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await login.json();

      if (!login.ok) throw new Error(response?.message || "Login failed");

      // 2. Fetch Profile data
      const profile = await fetch(`${DATA_API}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response?.access_token}`,
        },
      });

      if (!profile.ok) throw new Error("Profile fetch failed");

      const profileData = await profile.json();

      // 3. Call NextAuth SignIn
      await signIn("credentials", {
        redirect: true,
        access_token: response.access_token,
        role: response.role,
        profile: JSON.stringify(profileData),
      });
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error?.message || "Our servers are currently undergoing maintenance."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{}}
      >
        {({ register, formState: { errors } }) => (
          <Card
            style={{
              maxWidth: "500px",
              width: "100%",
              padding: "2rem",
              minWidth: "350px",
            }}
          >
            <Flex direction="column" gap="4" align="center">
              <Avatar size="5" fallback="LG" radius="full" mb="2" />
              <Text size="5" mb="20px" weight="bold">
                Sign In to Your Account
              </Text>
              <Box width="100%">
                <Input
                  type="text"
                  placeholder="Enter your email or username"
                  {...register("username")}
                  disabled={isLoading}
                />
              </Box>
              <Box width="100%" className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[8px] flex h-5 w-5 items-center justify-center text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                </button>
              </Box>
              {errorMsg && (
                <Text color="red" size="2">
                  {errorMsg}
                </Text>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4"
              >
                {isLoading ? "Signing In..." : "Login"}
              </Button>
            </Flex>
          </Card>
        )}
      </Form>
    </Flex>
  );
}
