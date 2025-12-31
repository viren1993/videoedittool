"use client";

import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { DATA_API } from "@/config/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Customer Schema
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
  password: z.string().min(6, "Password must be minimum 6 chars"),
  logo_file: z.any().optional(),
});

export default function BulkCustomerCreate() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const rows = result.data;
        const validationErrors: any[] = [];

        const validatedRows = rows.map((row: any, index: number) => {
          const response = createCustomerSchema.safeParse(row);

          if (!response.success) {
            validationErrors.push({
              row: index + 1,
              errors: response.error.errors.map((e) => e.message),
            });
          }

          return row;
        });

        setCustomers(validatedRows);
        setErrors(validationErrors);
      },
    });
  };

  const handleUploadToServer = async () => {
    if (customers.length === 0) {
      setErrorMsg("Please upload a CSV file!");
      return;
    }

    if (errors.length > 0) {
      setErrorMsg("Please fix CSV validation errors first!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${DATA_API}/customer`, customers, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Customers created successfully!");
      setTimeout(() => {
        router.push("/company/customer");
      }, 800);
      console.log("API Response:", response.data);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid style={{ padding: 20 }}>
      <Flex align="center" gap="2" style={{ marginBottom: 10 }}>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="my-3"
          height="42px"
        />
        <button
          onClick={handleUploadToServer}
          disabled={loading}
          className="px-4 w-fit min-w-[300px] py-2 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Uploading..." : "Create Customers"}
        </button>
      </Flex>
      {errorMsg && (
        <Text
          as="p"
          style={{ color: "red", marginBottom: 12, fontSize: "14px" }}
        >
          {errorMsg}
        </Text>
      )}

      {/* Inline Error Section */}
      {errors.length > 0 && (
        <div style={{ color: "red", marginBottom: 12, fontSize: "14px" }}>
          ❌ Fix validation errors before uploading:
          <ul style={{ margin: "5px 0 0 20px" }}>
            {errors.map((err, idx) => (
              <li key={idx}>
                Row {err.row}: {err.errors.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* JSON preview */}
      <div
        style={{
          height: 500,
          overflowY: "scroll",
          marginTop: 20,
          background: "#111",
          padding: 10,
          borderRadius: 6,
        }}
      >
        <pre style={{ color: "white" }}>
          {JSON.stringify(customers, null, 2)}
        </pre>
      </div>
    </Grid>
  );
}
