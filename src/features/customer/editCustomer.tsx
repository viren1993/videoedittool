"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Dialog,
  Flex,
  Grid,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { DATA_API } from "@/config/constants";
import { toast } from "sonner";
import * as Label from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ICustomer } from "./type";
import { Form } from "@/components/ui/form";
import axios from "axios";

interface CompanieEditProps {
  data?: Partial<ICustomer>;
  open: boolean;
  setOpen: (open: boolean) => void;
  setRefreshApi: React.Dispatch<React.SetStateAction<boolean>>;
}

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
  status: z.boolean(),
  existing_logo_url: z.string().optional(), // Add this to handle existing logo
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export default function EditCustomer({
  data,
  setOpen,
  setRefreshApi,
}: CompanieEditProps) {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;

  const onSubmit: SubmitHandler<CreateCustomerInput> = async (
    formDataInput
  ) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append(
        "customer_company_name",
        formDataInput.customer_company_name
      );
      formData.append("full_name", formDataInput.full_name);
      formData.append("username", formDataInput.username);
      formData.append("email", formDataInput.email);
      formData.append("phone_number", formDataInput.phone_number);
      formData.append("telephone_number", formDataInput.telephone_number);
      formData.append("city", formDataInput.city);
      formData.append("address", formDataInput.address);
      formData.append("status", data?.status || "active");

      if (formDataInput.logo_file && formDataInput.logo_file.length > 0) {
        formData.append("logo_file", formDataInput.logo_file[0]);
      } else if (!formDataInput.existing_logo_url) {
        // If no existing logo and no new file, you might want to handle removal
        formData.append("logo_file", ""); // Send empty to remove logo
      }

      const customerId = data?.id;
      if (!customerId) {
        throw new Error("Customer ID is missing for update.");
      }

      const response = await axios.patch(
        `${DATA_API}/customer/${customerId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(<Text>Customer updated successfully!</Text>);
        setOpen(false);
      }
    } catch (error) {
      setErrorMsg("Something went wrong, please try again.");
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Content maxWidth="600px">
      <Dialog.Title>Edit Customer</Dialog.Title>
      <hr className="my-4" />

      <Form<CreateCustomerInput>
        onSubmit={onSubmit}
        validationSchema={createCustomerSchema}
        useFormProps={{
          defaultValues: {
            customer_company_name: data?.customer_company_name,
            full_name: data?.full_name,
            username: data?.user?.username,
            email: data?.user?.email,
            phone_number: data?.phone_number,
            telephone_number: data?.telephone_number,
            city: data?.city,
            address: data?.address,
            status: data?.status === "active" || false,
            existing_logo_url: data?.logo_url,
          },
        }}
        className="grid grid-cols-1 gap-6 mt-4"
      >
        {({ register, control, formState: { errors }, watch }) => {
          const existingLogoUrl = watch("existing_logo_url");
          const logoFile = watch("logo_file");

          return (
            <>
              <div className="grid gap-4">
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Customer Company Name
                  </Label.Root>
                  <Input {...register("customer_company_name")} />
                  <p className="text-sm text-red-500">
                    {errors.customer_company_name?.message}
                  </p>
                </div>
                <Flex gap="2">
                  <Grid width={"100%"}>
                    <Label.Root className="mb-1 block font-medium">
                      Username
                    </Label.Root>
                    <Input {...register("username")} />
                    <p className="text-sm text-red-500">
                      {errors.username?.message}
                    </p>
                  </Grid>
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
                  <Grid width={"100%"}>
                    <Label.Root className="mb-1 block font-medium">
                      Telephone Number
                    </Label.Root>
                    <Input
                      placeholder="Enter 10 digit phone number"
                      maxLength={10}
                      {...register("telephone_number")}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                      }}
                    />
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
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Upload Logo (PNG/JPG/JPEG)
                  </Label.Root>
                  {existingLogoUrl && !logoFile?.length && (
                    <div className="mb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={`${DATA_API}/media/${existingLogoUrl}`}
                          alt="Current customer Logo"
                          className="object-cover h-[100px] rounded border"
                        />
                      </div>
                    </div>
                  )}
                  {logoFile?.length > 0 && (
                    <div className="mb-3">
                      <Text size="2" color="gray" className="mb-1 block">
                        New logo preview:
                      </Text>
                      <img
                        src={URL.createObjectURL(logoFile[0])}
                        alt="New logo preview"
                        className="h-16 w-16 object-cover rounded border"
                      />
                    </div>
                  )}
                  <Controller
                    name="logo_file"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div>
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg"
                          className="block border p-2 rounded w-full"
                          onChange={(e) => onChange(e.target.files)}
                        />
                        <p className="text-sm text-red-500 mt-1">
                          {errors.logo_file?.message?.toString()}
                        </p>
                        {value?.length > 0 && (
                          <Button
                            type="button"
                            variant="soft"
                            size="1"
                            onClick={() => onChange(null)}
                            className="mt-2"
                          >
                            Clear selected file
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Text as="label" size="2">
                      <Flex gap="2">
                        <Checkbox
                          checked={value}
                          onCheckedChange={(checked) => {
                            onChange(checked === true);
                          }}
                          ref={ref}
                        />
                        Status
                      </Flex>
                    </Text>
                  )}
                />
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
          );
        }}
      </Form>
    </Dialog.Content>
  );
}
