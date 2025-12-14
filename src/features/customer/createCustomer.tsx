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
import { Eye, EyeClosed, UserPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const isImageFile = (file: File) => {
  return (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/jpg"
  );
};

const createCustomerSchema = z.object({
  customer_company_name: z.string().min(1, "Customer company name is required"),
  full_name: z.string().min(1, "Full name is required"),
  username: z.string().min(1).max(20, "Username must be max 20 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone_number: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Phone number must contain only digits"),
  telephone_number: z
    .string()
    .min(6, "Telephone number must be at least 6 digits")
    .max(15, "Telephone number must be max 15 digits"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required").max(250),
  logo_file: z
    .any()
    .refine((files) => !files || files.length === 0 || isImageFile(files[0]), {
      message: "Logo must be a PNG, JPG, or JPEG image.",
    })
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export default function CreateCustomer() {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;
  const [open, setOpen] = useState(false);

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
  });

  const onSubmit: SubmitHandler<CreateCustomerInput> = async (data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();

      formData.append("customer_company_name", data.customer_company_name);
      formData.append("full_name", data.full_name);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", "Abc@1234");
      formData.append("city", data.city);
      formData.append("phone_number", data.phone_number);
      formData.append("telephone_number", data.telephone_number);
      formData.append("address", data.address);
      formData.append("status", "active");

      // Handle file upload properly
      if (data.logo_file && data.logo_file.length > 0) {
        formData.append("logo_file", data.logo_file[0]);
      }

      const response = await axios.post(`${DATA_API}/customer`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Customer created successfully!");
        reset(); // Reset form
        setOpen(false);
      }
    } catch (err: any) {
      console.error("Error creating customer:", err);

      // Handle different error formats
      let errorMessage = "Failed to create company";

      if (err.response?.data?.detail?.msg) {
        errorMessage = err.response.data.detail.msg;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.detail) {
        // Handle if detail is a string or object
        errorMessage =
          typeof err.response.data.detail === "string"
            ? err.response.data.detail
            : JSON.stringify(err.response.data.detail);
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely render error messages
  const renderErrorMessage = (error: any) => {
    if (!error) return null;

    if (typeof error === "string") {
      return error;
    }

    if (error.message) {
      return typeof error.message === "string"
        ? error.message
        : error.message.msg || JSON.stringify(error.message);
    }

    return JSON.stringify(error);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button className="cursor-pointer">
          <UserPlus className="w-4 h-4" />
          <span className="ml-2">Add Customer</span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Customer Create</Dialog.Title>
        <hr className="my-4" />

        {/* Use react-hook-form's handleSubmit */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 mt-4"
        >
          <div className="grid gap-4">
            <div>
              <Label.Root className="mb-1 block font-normal">
                Customer Company Name
              </Label.Root>
              <Input {...register("customer_company_name")} />
              <p className="text-sm text-red-500">
                {renderErrorMessage(errors.customer_company_name)}
              </p>
            </div>
            <div>
              <Label.Root className="mb-1 block font-normal">
                Full Name
              </Label.Root>
              <Input {...register("full_name")} />
              <p className="text-sm text-red-500">
                {renderErrorMessage(errors.full_name)}
              </p>
            </div>
            <Flex gap="2">
              <Grid width={"100%"}>
                <Label.Root className="mb-1 block font-normal">
                  Username
                </Label.Root>
                <Input {...register("username")} />
                <p className="text-sm text-red-500">
                  {renderErrorMessage(errors.username)}
                </p>
              </Grid>
              <Grid width={"100%"}>
                <Label.Root className="mb-1 block font-normal">
                  Email
                </Label.Root>
                <Input {...register("email")} type="email" />
                <p className="text-sm text-red-500">
                  {renderErrorMessage(errors.email)}
                </p>
              </Grid>
            </Flex>
            <Flex gap="3">
              <Grid width={"100%"}>
                <Label.Root className="mb-1 block font-normal">
                  Phone Number
                </Label.Root>
                <Input
                  placeholder="Enter 10 digit phone number"
                  maxLength={10}
                  {...register("phone_number")}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                />
                <p className="text-sm text-red-500">
                  {renderErrorMessage(errors.phone_number)}
                </p>
              </Grid>
              <Grid width={"100%"}>
                <Label.Root className="mb-1 block font-normal">
                  Telephone Number
                </Label.Root>
                <Input
                  {...register("telephone_number")}
                  maxLength={15}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                />
                <p className="text-sm text-red-500">
                  {renderErrorMessage(errors.telephone_number)}
                </p>
              </Grid>
            </Flex>
            <div>
              <Label.Root className="mb-1 block font-normal">City</Label.Root>
              <Input {...register("city")} />
              <p className="text-sm text-red-500">
                {renderErrorMessage(errors.city)}
              </p>
            </div>
            <div>
              <Label.Root className="mb-1 block font-normal">
                Address
              </Label.Root>
              <TextArea {...register("address")} className="w-full" rows={3} />
              <p className="text-sm text-red-500">
                {renderErrorMessage(errors.address)}
              </p>
            </div>
            <div>
              <Label.Root className="mb-1 block font-normal">
                Upload Logo (PNG/JPG/JPEG)
              </Label.Root>
              <Controller
                name="logo_file"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg, image/png, image/jpeg"
                      className="block border p-2 rounded w-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file ? e.target.files : null);
                      }}
                      {...field}
                    />
                    {value && value.length > 0 && (
                      <Text className="text-green-600 text-sm mt-2">
                        Selected: {value[0].name} (
                        {(value[0].size / 1024).toFixed(2)} KB)
                      </Text>
                    )}
                    <p className="text-sm text-red-500 mt-1">
                      {renderErrorMessage(errors.logo_file)}
                    </p>
                  </div>
                )}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <span className="text-sm text-red-600">{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-4 mt-6">
            <Dialog.Close>
              <Button
                type="button"
                variant="ghost"
                disabled={isLoading}
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
