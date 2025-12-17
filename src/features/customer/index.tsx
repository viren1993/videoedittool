"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { DATA_API } from "@/config/constants";
import CustomerTable from "./customerTable";
import { Skeleton } from "@radix-ui/themes";
import { ICustomer } from "./type";

export default function Customer() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [customersData, setcustomersData] = useState(null as ICustomer[] | any);

  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${DATA_API}/customer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });
        if (!res.ok) {
          return;
        }
        const user = await res.json();
        setcustomersData(user);
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
      {isLoading ? (
        <Skeleton width="100%" height="48px" />
      ) : (
        <CustomerTable data={customersData} />
      )}
    </>
  );
}
