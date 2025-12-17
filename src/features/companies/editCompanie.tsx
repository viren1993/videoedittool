"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler } from "react-hook-form";
import {
  Button,
  Dialog,
  Flex,
  Grid,
  Text,
  TextArea,
  Checkbox,
} from "@radix-ui/themes";
import { Form } from "@/components/ui/form";
import { DATA_API } from "@/config/constants";
import { toast } from "sonner";
import * as Label from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import axios from "axios";

export interface GetCompany {
  company_name: string;
  description: string;
  mobile: string;
  logo_url: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  company_id: string;
  role: string;
  user_status: string;
  user_created_at: string;
  user_updated_at: string;
}

interface CompanieEditProps {
  data?: Partial<GetCompany>;
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
  company_name: z.string().min(1, "Customer company name is required"),
  username: z.string().min(1).max(20, "Username must be max 20 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  mobile: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Phone number must contain only digits"),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description too long" }),
  status: z.boolean(),
  logo_file: z
    .any()
    .refine((files) => !files || files.length === 0 || isImageFile(files[0]), {
      message: "Logo must be a PNG, JPG, or JPEG image.",
    })
    .optional(),
  existing_logo_url: z.string().optional(), // Add this to handle existing logo
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export default function EditCompanie({
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
      formData.append("company_name", formDataInput.company_name);
      formData.append("email", formDataInput.email);
      formData.append("mobile", formDataInput.mobile);
      formData.append("username", formDataInput.username);
      formData.append("status", formDataInput.status ? "active" : "inactive");
      formData.append("description", formDataInput.description || "");

      if (formDataInput.logo_file && formDataInput.logo_file.length > 0) {
        formData.append("logo_file", formDataInput.logo_file[0]);
      } else if (!formDataInput.existing_logo_url) {
        // If no existing logo and no new file, you might want to handle removal
        formData.append("logo_file", ""); // Send empty to remove logo
      }

      const companyId = data?.company_id;
      if (!companyId) {
        throw new Error("Company ID is missing for update.");
      }

      const response = await axios.patch(
        `${DATA_API}/company/${companyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(<Text>Company updated successfully!</Text>);
        setOpen(false);
        setRefreshApi((prev) => !prev);
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Content maxWidth="600px">
      <Dialog.Title>Edit Company</Dialog.Title>
      <Dialog.Description>Edit the company details.</Dialog.Description>
      <Form<CreateCustomerInput>
        onSubmit={onSubmit}
        validationSchema={createCustomerSchema}
        useFormProps={{
          defaultValues: {
            company_name: data?.company_name,
            username: data?.username,
            email: data?.email,
            mobile: data?.mobile,
            description: data?.description,
            status: data?.status === "active",
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
                  <Input {...register("company_name")} />
                  <p className="text-sm text-red-500">
                    {errors.company_name?.message}
                  </p>
                </div>
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
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Description
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
                <div>
                  <Label.Root className="mb-1 block font-medium">
                    Upload Logo (PNG/JPG/JPEG)
                  </Label.Root>
                  {existingLogoUrl && !logoFile?.length && (
                    <div className="mb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={`${DATA_API}/media/${existingLogoUrl}`}
                          alt="Current Company Logo"
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
              {errorMsg && (
                <span className="text-sm text-red-500">{errorMsg}</span>
              )}
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
