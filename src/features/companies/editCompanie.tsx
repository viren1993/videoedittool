"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  Flex,
  Grid,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { CheckIcon, SquarePen } from "lucide-react";
import { Form } from "@/components/ui/form";
import { DATA_API } from "@/config/constants";
import { toast } from "sonner";
import * as Label from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import * as Checkbox from '@radix-ui/react-checkbox';

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
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description too long' }),
  status: z.boolean(),
  logo_file: z
    .any()
    .refine((files) => !files || files.length === 0 || isImageFile(files[0]), {
      message: "Logo must be a PNG, JPG, or JPEG image.",
    })
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export default function EditCompanie({ data }: CompanieEditProps) {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;
  const [open, setOpen] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckChange = (checked : any) => {
    if (typeof checked === 'boolean') {
      setIsChecked(checked);
      // console.log('Checkbox state changed to:', checked);
    }
  };

  const onSubmit: SubmitHandler<CreateCustomerInput> = async (
    formDataInput
  ) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();

      formData.append("company_name", formDataInput.company_name);
      formData.append("username", formDataInput.username);
      formData.append("email", formDataInput.email);
      formData.append("mobile", formDataInput.mobile);
      formData.append("status", formDataInput.status ? 'active' : 'inactive');
      formData.append("description", formDataInput.description || "");

      if (formDataInput.logo_file && formDataInput.logo_file[0]) {
        formData.append("logo_file", formDataInput.logo_file[0]);
      }

      const companyId = data?.company_id;
      if (!companyId) {
        throw new Error("Company ID is missing for update.");
      }

      const res = await fetch(`${DATA_API}/company/${companyId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      const response = await res.json();

      if (res.ok) {
        toast.success(<Text>Company updated successfully!</Text>);
        setOpen(false);
      } else {
        setErrorMsg(response?.detail || "Failed to update company");
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
        <Dialog.Title>Edit Company</Dialog.Title>
        <Dialog.Description>
          Edit the company details.
        </Dialog.Description>
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
              status: data?.status === 'active',
              logo_file: data?.logo_url,
            },
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

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox.Root
                    className="CheckboxRoot" 
                    checked={isChecked}
                    onCheckedChange={handleCheckChange}
                    id="terms"
                  >
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon /> 
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  
                  <label className="Label" htmlFor="terms" style={{ paddingLeft: 10 }}>
                    Status
                  </label>
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
