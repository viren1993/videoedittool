"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { DATA_API } from "@/config/constants";
import CustomerTable from "./customerTable";
import { Flex } from "@radix-ui/themes";
import CreateCustomer from "./createCustomer";
import { CustomerPorps } from "./type";

export default function Customer() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [customersData, setcustomersData] = useState(
    null as CustomerPorps[] | any
  );

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
      <Flex gap="2" justify="between">
        <h1>Customer List</h1>
        <CreateCustomer />
      </Flex>
      {customersData?.length > 0 && <CustomerTable data={customersData} />}
    </>
  );
}
