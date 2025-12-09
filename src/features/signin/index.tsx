"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { DATA_API } from "@/config/constants";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function Signin() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setErrorMsg(null);
    setLoading(true);

    try {
      const login = await fetch(`${DATA_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await login.json();

      if (!login.ok) throw new Error(response?.message || "Login failed");

      // Fetch Profile
      const profile = await fetch(`${DATA_API}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response?.access_token}`,
        },
      });

      if (!profile.ok) throw new Error("Profile fetch failed");

      const profileData = await profile.json();

      // Call NextAuth SignIn
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
    <Form<LoginSchema> validationSchema={loginSchema} onSubmit={onSubmit}>
      {({ register, formState: { errors } }) => (
        <div className="space-y-5">
          <Input
            disabled={isLoading}
            type="text"
            // label="Username"
            placeholder="Enter your username"
            className="[&>label>span]:font-medium"
            // inputClassName="text-sm"
            {...register("username")}
            // error={errors.username?.message}
          />
          {/* <Input
            disabled={isLoading}
            label="Password"
            placeholder="Enter your password"
            // size="lg"
            className="[&>label>span]:font-medium"
            inputClassName="text-sm"
            {...register("password")}
            // error={errors.password?.message}
          /> */}
          <PasswordToggleField.Root>
            <div className="flex flex-nowrap items-center justify-center rounded-[4px] text-white bg-black-a2 shadow-[0_0_0_1px_var(--black-a6)] px-[0.75em] pr-[9px] h-[36px] gap-2 hover:shadow-[0_0_0_1px_black] focus-within:shadow-[0_0_0_2px_black]">
              <PasswordToggleField.Input
                {...register("password")}
                className="all-[unset] box-border h-[18px] text-[15px] text-inherit leading-[1] selection:bg-blackA6 selection:text-white"
              />
              <PasswordToggleField.Toggle className="all-[unset] box-border h-[18px] text-[15px] text-inherit leading-[1] flex items-center justify-center aspect-[1/1] rounded-[0.5px] focus-visible:outline-[2px] focus-visible:outline-accent-9 focus-visible:outline-offset-[2px]">
                <PasswordToggleField.Icon
                  visible={<Eye />}
                  hidden={<EyeClosed />}
                />
              </PasswordToggleField.Toggle>
            </div>
          </PasswordToggleField.Root>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <Button className="w-full" type="submit" size="lg">
            <span>Sign in</span>
          </Button>
        </div>
      )}
    </Form>
  );
}
