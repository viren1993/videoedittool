import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import Customer from "@/features/templates/customer";
import { Flex, Grid } from "@radix-ui/themes";

export const metadata = {
  ...metaObject("Template Customer Links"),
};

const pageHeader = {
  title: "Template Customer Links",
  breadcrumb: [
    {
      href: "/company",
      name: "Home",
    },
    {
      href: "/company/templates",
      name: "Templates List",
    },
    {
      name: "Template Customer Links",
    },
  ],
};

export default function TemplateCustomer() {
  return (
    <Grid className="container flex-1 mx-auto p-8">
      <Flex justify={"between"} align={"start"}>
        <PageHeader
          className="pt-2"
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
      </Flex>
      <Customer />
    </Grid>
  );
}
