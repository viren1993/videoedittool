import { metaObject } from "@/config/site.config";
import Companies from "@/features/companies";
import { Flex, Grid } from "@radix-ui/themes";

export const metadata = {
  ...metaObject("Companies List"),
};

const pageHeader = {
  title: "Companies List",
  breadcrumb: [
    {
      href: "/organization",
      name: "Home",
    },
    {
      name: "Companies List",
    },
  ],
};

export default function companiesPage() {
  return (
    <Grid className="container flex-1 mx-auto p-8">
      <Companies />
    </Grid>
  );
}
