import { Button, Flex, Grid } from "@radix-ui/themes";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import Customer from "@/features/customer";
import BulkCustomerCreate from "@/features/customer/bulkCustomerCreate";

export const metadata = {
  ...metaObject("Add Customer Bulk"),
};

const pageHeader = {
  title: "Add Customer Bulk",
  breadcrumb: [
    {
      href: "/company",
      name: "Home",
    },
    {
      href: "/company/customer",
      name: "Customer List",
    },
    {
      name: "Add Customer Bulk",
    },
  ],
};

export default function BulkCreate() {
  return (
    <Grid className="container flex-1 mx-auto p-8">
      <Flex justify={"between"} align={"start"}>
        <PageHeader
          className="pt-2"
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
      </Flex>
      <BulkCustomerCreate />
    </Grid>
  );
}
