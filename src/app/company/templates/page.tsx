import { Button, Flex, Grid } from "@radix-ui/themes";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import Customer from "@/features/customer";
import CreateCustomer from "@/features/customer/createCustomer";
import Templates from "@/features/templates";
import Link from "next/link";

export const metadata = {
  ...metaObject("Customer List"),
};

const pageHeader = {
  title: "Templates List",
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

export default function TemplatesPage() {
  return (
    <Grid className="container flex-1 mx-auto p-8">
      <Flex justify={"between"} align={"start"}>
        <PageHeader
          className="pt-2"
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <Button variant="solid">
          <Link href="/company/templates/create">Create Templates</Link>
        </Button>
      </Flex>
      <Templates />
    </Grid>
  );
}
