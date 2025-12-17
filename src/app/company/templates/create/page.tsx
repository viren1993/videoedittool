import { Flex, Grid } from "@radix-ui/themes";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import Templates from "@/features/templates";
import CreateTemplates from "@/features/createTemplates";

export const metadata = {
  ...metaObject("Create Templates"),
};

const pageHeader = {
  title: "Create Templates",
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
      name: "Create Templates",
    },
  ],
};

export default function TemplatesPage() {
  return (
    <Grid className="@container-fluid">
      <CreateTemplates />
    </Grid>
  );
}
