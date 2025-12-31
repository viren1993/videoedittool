"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DATA_API } from "@/config/constants";
import axios from "axios";
import * as Label from "@radix-ui/react-label";
import { toast } from "sonner";
import { Dialog, Flex, Grid, Text, TextArea } from "@radix-ui/themes";
import { Eye, EyeClosed, UserPlus } from "lucide-react"; // Removed Check icon
import { zodResolver } from "@hookform/resolvers/zod";

const isImageFile = (file: File) => {
  return (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/jpg"
  );
};

const createCustomerSchema = z.object({
  company_name: z.string().min(1, { message: "Company name is required" }),
  username: z.string().min(1).max(20, "Username must be max 20 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  mobile: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Phone number must contain only digits"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description too long" }),
  logo_file: z
    .any()
    .refine((files) => !files || files.length === 0 || isImageFile(files[0]), {
      message: "Logo must be a PNG, JPG, or JPEG image.",
    })
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export default function CreateCustomer({
  setRefreshApi,
}: {
  setRefreshApi: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;
  const [open, setOpen] = useState(false);
  const formMethods = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
  });
  const { reset } = formMethods;

  const onSubmit: SubmitHandler<CreateCustomerInput> = async (data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("company_name", data.company_name);
      formData.append("email", data.email);
      formData.append("mobile", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("description", data.description || "");
      formData.append("status", "active");

      if (data.logo_file && data.logo_file.length > 0) {
        formData.append("logo_file", data.logo_file[0]);
      }

      const response = await axios.post(`${DATA_API}/company`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Company created successfully!");
        reset();
        setOpen(false);
        setRefreshApi((prev) => !prev);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail?.msg ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.detail ||
        err.message ||
        "Failed to create company";

      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button className="cursor-pointer">
          <UserPlus className="w-4 h-4" />
          <span className="ml-2">Add Company</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Create Company</Dialog.Title>
        <hr className="my-4" />
        <Form<CreateCustomerInput>
          onSubmit={onSubmit}
          validationSchema={createCustomerSchema}
          useFormProps={{
            resolver: zodResolver(createCustomerSchema),
          }}
          className="grid grid-cols-1 gap-6 mt-4"
        >
          {({ register, control, formState: { errors } }) => (
            <>
              <div className="grid gap-4">
                {/* Customer Company Name */}
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Customer Company Name
                  </Label.Root>
                  <Input {...register("company_name")} />
                  <p className="text-sm text-red-500">
                    {errors.company_name?.message}
                  </p>
                </div>
                {/* Username */}
                <Grid width={"100%"}>
                  <Label.Root className="mb-1 block font-medium">
                    Username
                  </Label.Root>
                  <Input {...register("username")} />
                  <p className="text-sm text-red-500">
                    {errors.username?.message}
                  </p>
                </Grid>

                {/* Email */}
                <Grid width={"100%"}>
                  <Label.Root className="mb-1 block font-medium">
                    Email
                  </Label.Root>
                  <Input {...register("email")} type="email" />
                  <p className="text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                </Grid>
                {/* Phone Number */}
                <Grid width={"100%"}>
                  <Label.Root className="mb-1 block font-medium">
                    Phone Number
                  </Label.Root>
                  <Input
                    placeholder="Enter 10 digit phone number"
                    maxLength={10}
                    {...register("mobile")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    }}
                  />
                  <p className="text-sm text-red-500">
                    {errors.mobile?.message}
                  </p>
                </Grid>

                {/* Address (Textarea) */}
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Address
                  </Label.Root>
                  <TextArea
                    {...register("description")}
                    className="w-full"
                    rows={3}
                  />
                  <p className="text-sm text-red-500">
                    {errors.description?.message}
                  </p>
                </div>

                {/* Password + Toggle */}
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

                {/* File Upload (Controlled) */}
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Upload Logo (PNG/JPG/JPEG)
                  </Label.Root>
                  <Controller
                    name="logo_file"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div>
                        <input
                          type="file"
                          // Use the accept attribute to suggest file types
                          accept=".png, .jpg, .jpeg, image/png, image/jpeg"
                          className="block border p-2 rounded"
                          // Use onChange to capture the FileList and update the form state
                          onChange={(e) => onChange(e.target.files)}
                        />
                        {/* Display the selected file name if a file is present */}
                        {value?.length > 0 && (
                          <Text className="text-green-600 text-sm mt-2">
                            Selected: **{value[0].name}** (
                            {(value[0].size / 1024).toFixed(2)} KB)
                          </Text>
                        )}
                        {/* Ensure message is treated as a string */}
                        <p className="text-sm text-red-500 mt-1">
                          {errors.logo_file?.message?.toString()}
                        </p>
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Error Message */}
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
