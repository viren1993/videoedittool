import { Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import Customer from "@/features/customer";
import CreateCustomer from "@/features/customer/createCustomer";

export const metadata = {
  ...metaObject("Bulk Customer Create"),
};

const pageHeader = {
  title: "Customer List",
  breadcrumb: [
    {
      href: "/company",
      name: "Home",
    },
    {
      name: "Customer List",
    },
  ],
};

export default function CustomerPage() {
  return (
    <Grid className="container flex-1 mx-auto p-8">
      <Flex justify={"between"} align={"start"}>
        <PageHeader
          className="pt-2"
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <Flex gap="2" align={"start"}>
          <Button className="cursor-pointer">
            <Link href="/company/customer/bulk-create">
              Add Customer in Bulk
            </Link>
          </Button>
          <CreateCustomer />
        </Flex>
      </Flex>
      <Customer />
    </Grid>
  );
}
