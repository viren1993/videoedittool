"use client";

import { Company } from "./type";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { Eye, EyeClosed, Grid, SquarePen, UserPlus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { DATA_API } from "@/config/constants";
import { toast } from "sonner";
import * as Label from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { z } from "zod";

interface CompanieEditProps {
  data?: Partial<Company>;
}

const isImageFile = (file: File) => {
  return (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/jpg"
  );
};

// --- Zod Schema for Validation (STATUS REMOVED) ---
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

export default function CompanieEdit({ data }: CompanieEditProps) {
  const [isLoading, setLoading] = useState(false);
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
      formData.append("company_name", data.customer_company_name);
      formData.append("email", data.email);
      formData.append("mobile", data.phone_number);
      formData.append("username", data.username);
      formData.append("status", data ? "active" : "inactive");
      formData.append("description", data. || "");

      if (data.logo_file && data.logo_file.length > 0) {
        formData.append("logo_file", data.logo_file[0]);
      }

      formData.forEach((v, k) => console.log(k, v));

      const res = await fetch(`${DATA_API}/company/${company.company_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const response = (await res.json()) as any;

      if (res.ok) {
        toast.success(<Text>Company updated successfully!</Text>);
        setOpen(false); // Close the Radix Dialog
      } else {
        setErrorMsg(
          response?.detail?.msg ||
            response?.detail ||
            response?.message ||
            "Failed to update company"
        );
        toast.error("Failed to update company");
      }
    } catch (error) {
      setErrorMsg("Something went wrong, please try again.");
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton color="violet" variant="soft">
          <SquarePen width="18" height="18" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Create Company</Dialog.Title>
        <Dialog.Description>
          Add a new company to your account.
        </Dialog.Description>

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
                  <Input {...register("customer_company_name")} />
                  <p className="text-sm text-red-500">
                    {errors.customer_company_name?.message}
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Full Name
                  </Label.Root>
                  <Input {...register("full_name")} />
                  <p className="text-sm text-red-500">
                    {errors.full_name?.message}
                  </p>
                </div>

                <Flex gap="2">
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
                </Flex>
                <Flex gap="3">
                  {/* Phone Number */}
                  <Grid width={"100%"}>
                    <Label.Root className="mb-1 block font-medium">
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
                      {errors.phone_number?.message}
                    </p>
                  </Grid>

                  {/* Telephone Number */}
                  <Grid width={"100%"}>
                    <Label.Root className="mb-1 block font-medium">
                      Telephone Number
                    </Label.Root>
                    <Input {...register("telephone_number")} />
                    <p className="text-sm text-red-500">
                      {errors.telephone_number?.message}
                    </p>
                  </Grid>
                </Flex>

                {/* City */}
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    City
                  </Label.Root>
                  <Input {...register("city")} />
                  <p className="text-sm text-red-500">{errors.city?.message}</p>
                </div>

                {/* Address (Textarea) */}
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Address
                  </Label.Root>
                  <TextArea
                    {...register("address")}
                    className="w-full"
                    rows={3}
                  />
                  <p className="text-sm text-red-500">
                    {errors.address?.message}
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

                {/* The Radix Checkbox section for 'status' was removed here 
                        as requested. 
                      */}
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
