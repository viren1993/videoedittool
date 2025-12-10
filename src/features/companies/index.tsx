"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { DATA_API } from "@/config/constants";
import CompanyTable from "./company-table";

export interface CompanyListProps {
  company_id: string;
  company_name: string;
  email: string;
  mobile: string;
  description?: string;
  logo_url?: string | null;
  username: string;
  status: "active" | "deactive";
  created_at: string;
  updated_at: string;
  user: string;
  user_id: string;
  role: string;
  user_status: string;
  user_created_at: string;
  user_updated_at: string;
  website?: string;
}

export default function Companies() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState(null as CompanyListProps[] | any);
  console.log("companies", companies);

  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${DATA_API}/company`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });
        console.log("res", res);

        if (!res.ok) {
          console.error("Failed to fetch company data:", res.status);
          return;
        }

        const user = await res.json();
        setCompanies(user);
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchCompany();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <h1>Companies get call</h1>
      {companies?.length > 0 && <CompanyTable data={companies} />}
    </>
  );
}
