"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Text } from "@radix-ui/themes";
import { Eye, EyeClosed, KeySquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { messages } from "@/config/messages";
import { useLogout } from "@/utils/logout";
import * as Label from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { DATA_API } from "@/config/constants";

/* -------------------- Initial Values -------------------- */
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/* -------------------- Validation Schema -------------------- */
const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),

    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/.*[A-Z].*/, { message: messages.passwordOneUppercase })
      .regex(/.*[a-z].*/, { message: messages.passwordOneLowercase })
      .regex(/.*\d.*/, { message: messages.passwordOneNumeric })
      .refine((val) => !/\s/.test(val), {
        message: "Password must not contain spaces",
      }),

    confirmPassword: z.string().min(1, {
      message: "Please confirm your password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmPassword"],
  });

export type UpdatedPasswordInput = z.infer<typeof resetPasswordSchema>;

/* -------------------- Component -------------------- */
export default function PasswordReset() {
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;

  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formMethods = useForm<UpdatedPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: initialValues,
  });

  const {
    formState: { errors },
  } = formMethods;

  const onSubmit: SubmitHandler<UpdatedPasswordInput> = async (data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${DATA_API}/auth/reset-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          old_password: data.oldPassword,
          new_password: data.newPassword,
        }),
      });

      const response = await res.json();

      if (res.ok) {
        toast.success(<Text>Password has been successfully changed</Text>);
        useLogout();
        setOpen(false);
      } else {
        setErrorMsg(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="solid" mt="4">
          <KeySquare />
          Reset Password
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Change Password</Dialog.Title>
        <hr className="my-2" />
        <Form<UpdatedPasswordInput>
          onSubmit={onSubmit}
          validationSchema={resetPasswordSchema}
          useFormProps={{ resolver: zodResolver(resetPasswordSchema) }}
          className="grid grid-cols-1 gap-6 mt-4"
        >
          {({ register, formState: { errors } }) => (
            <>
              <div>
                <Label.Root className="mb-1 block font-medium">
                  Old Password
                </Label.Root>
                <div className="relative">
                  <Input
                    type={showOld ? "text" : "password"}
                    {...register("oldPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowOld(!showOld)}
                  >
                    {showOld ? <EyeClosed size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-sm text-red-500">
                  {errors.oldPassword?.message}
                </p>
              </div>
              <div>
                <Label.Root className="mb-1 block font-medium">
                  New Password
                </Label.Root>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <EyeClosed size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-sm text-red-500">
                  {errors.newPassword?.message}
                </p>
              </div>
              <div>
                <Label.Root className="mb-1 block font-medium">
                  Confirm Password
                </Label.Root>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeClosed size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
              <div className="flex justify-end gap-4">
                <Dialog.Close>
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </>
          )}
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
