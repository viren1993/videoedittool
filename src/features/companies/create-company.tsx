'use client';

import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useSession } from 'next-auth/react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DATA_API } from '@/config/constants';


import axios from 'axios';
// Radix UI
import * as Label from '@radix-ui/react-label';
import * as Checkbox from '@radix-ui/react-checkbox';
import { toast } from 'sonner';
import { Text, TextArea } from '@radix-ui/themes';
import { Check, Eye, EyeClosed, X } from 'lucide-react';

const createCustomerSchema = z.object({
  customer_company_name: z.string().min(1, 'Customer company name is required'),
  full_name: z.string().min(1, 'Full name is required'),
  username: z.string().min(1).max(20),
  email: z.string().min(1).email(),
  phone_number: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^[0-9]{10}$/, 'Phone number must contain only digits'),
  telephone_number: z.string().min(6).max(15),
  password: z.string().min(8),
  city: z.string().min(1),
  address: z.string().min(1).max(250),
  status: z.boolean(),
  logo_file: z.any().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export default function CreateCustomer() {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;


  const onSubmit: SubmitHandler<CreateCustomerInput> = async (data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'logo_file') formData.append(key, String(value));
      });

      if (data.logo_file?.length > 0) {
        formData.append('logo_file', data.logo_file[0]);
      }

      formData.set('status', data.status ? 'active' : 'inactive');

      const response = await axios.post(`${DATA_API}/customer`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status >= 200 && response.status <= 201) {
        toast.success(<Text as='span' >Customer created successfully!</Text>);
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong.';

      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<CreateCustomerInput>
      onSubmit={onSubmit}
      validationSchema={createCustomerSchema}
      className="grid grid-cols-1 gap-6 p-6"
    >
      {({ register, control, formState: { errors }, watch }) => (
        <>
          {/* Header */}
          <div className="col-span-full flex items-center justify-between">
            <h4 className="font-semibold text-lg">Create Customer</h4>

            {/* Radix Close Button */}
            <button
              className="p-1 rounded hover:bg-gray-100"
              // onClick={closeModal}
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            {/* Standard Inputs */}
            {[
              ['Customer Company Name', 'customer_company_name'],
              ['Full Name', 'full_name'],
              ['Username', 'username'],
              ['Email', 'email'],
              ['Telephone Number', 'telephone_number'],
              ['City', 'city'],
            ].map(([labelText, fieldName]) => (
              <div key={fieldName}>
                <Label.Root className="mb-1 block font-medium">
                  {labelText}
                </Label.Root>
                <Input
                  {...register(fieldName as any)}
                  // error={errors[fieldName as keyof CreateCustomerInput]?.message}
                />
              </div>
            ))}

            {/* Phone number (react-phone-input) */}
            <div>
              <Label.Root className="mb-1 block font-medium">Phone Number</Label.Root>
              <Input
                placeholder="Enter 10 digit phone number"
                maxLength={10}
                {...register('phone_number')}
                // error={errors.phone_number?.message}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                }}
              />
              <p className="text-sm text-red-500">{errors.phone_number?.message}</p>
            </div>

            {/* Textarea (Radix UI) */}
            <div>
              <Label.Root className="mb-1 block font-medium">Address</Label.Root>
              <TextArea
                {...register('address')}
                className="w-full"
                rows={3}
              />
              <p className="text-sm text-red-500">{errors.address?.message}</p>
            </div>

            {/* Password + Toggle */}
            <div>
              <Label.Root className="mb-1 block font-medium">Password</Label.Root>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  // error={errors.password?.message}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <Label.Root className="mb-1 block font-medium">Upload Logo</Label.Root>
              <Controller
                name="logo_file"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="block border p-2 rounded"
                      onChange={(e) => onChange(e.target.files)}
                    />
                    {value?.length > 0 && (
                      <Text className="text-green-600 text-sm mt-2">
                        Selected: {value[0].name} ({(value[0].size / 1024).toFixed(2)} KB)
                      </Text>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Radix Checkbox */}
            <div className="flex items-center gap-2">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Checkbox.Root
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 bg-white border rounded flex items-center justify-center"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                )}
              />

              <Label.Root className="font-medium">Active</Label.Root>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && <span className="text-sm text-red-500">{errorMsg}</span>}

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" type="button" >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
