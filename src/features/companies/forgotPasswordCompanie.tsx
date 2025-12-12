"use client";

import { Button, Dialog, IconButton, Text } from "@radix-ui/themes";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { SquarePen } from "lucide-react";
import { Company } from "./type";
import { DATA_API } from "@/config/constants";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { GetCompany } from "./editCompanie";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

interface CompanieDeleteProps {
  data?: Partial<Company>;
}

const initialValues = {
  password: '',
};

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(new RegExp('.*[A-Z].*'), {
      message: 'The Password must contain at least one uppercase character',
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: 'The Password must contain at least one lowercase character',
    })
    .regex(new RegExp('.*\\d.*'), { message: 'The password must contain at least one numerical character' })
    .refine((value) => !/\s/.test(value), {
      message: 'Password must not contain spaces',
    }),
});

// generate form types from zod validation schema
export type updatedPasswordInput = z.infer<typeof resetPasswordSchema>;

interface PasswordForgetProps {
  accoutdata: GetCompany;
}

export default function forgotPasswordCompanie({ accoutdata }: PasswordForgetProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;

  const [reset, setReset] = useState({});
  const [errorMsg, setErrorMsg] = useState(null as any);
  const [isLoading, setLoading] = useState(false as boolean);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<updatedPasswordInput> = async (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setReset(initialValues);

    const formdata = JSON.stringify({
      user_id: accoutdata.user_id,
      new_password: data.password,
    });
    try {
      const res = await fetch(`${DATA_API}/auth/forgot-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: formdata,
      });
      const response = (await res.json()) as any;
      if (res.status === 200) {
        toast.success(
          <Text>Password has been successfully changed</Text>
        );
      } else {
        setErrorMsg(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!accoutdata) return null; // No UI if no data

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton color="violet" variant="soft">
          <SquarePen width="18" height="18" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Forgot Password</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to Forgot password  the company:
          <b> {accoutdata?.company_name}</b>? This action cannot be undone.
        </Dialog.Description>
        <Form<updatedPasswordInput>
          onSubmit={onSubmit}
          validationSchema={resetPasswordSchema}
          useFormProps={{
            resolver: zodResolver(resetPasswordSchema),
          }}
          className="grid grid-cols-1 gap-6 mt-4"
        >
          {({ register, formState: { errors } }) => (
            <>
              <div className="grid gap-4">
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Password
                  </Label.Root>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-red-500">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              {errorMsg && (
                <span className="text-sm text-red-500">{errorMsg}</span>
              )}
              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-4">
                <Dialog.Close>
                  <Button type="button" variant="ghost" disabled={isLoading}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button disabled={isLoading} type="submit">
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
