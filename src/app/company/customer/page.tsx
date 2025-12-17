import { Flex, Grid } from "@radix-ui/themes";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import Customer from "@/features/customer";
import CreateCustomer from "@/features/customer/createCustomer";

export const metadata = {
  ...metaObject("Customer List"),
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
        <CreateCustomer />
      </Flex>
      <Customer />
    </Grid>
  );
}
