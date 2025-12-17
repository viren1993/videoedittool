import PageHeader from "@/components/page-header";
import { metaObject } from "@/config/site.config";
import PasswordReset from "@/features/passwordReset";
import Profile from "@/features/profile";
import { Flex, Grid } from "@radix-ui/themes";

export const metadata = {
  ...metaObject("Organization profile page"),
};

const pageHeader = {
  title: "Company Profile",
  breadcrumb: [
    {
      href: "/company",
      name: "Home",
    },
    {
      name: "Company Profile",
    },
  ],
};

export default function ProfilePage() {
  return (
    <Grid className="container flex-1 mx-auto p-8">
      <Flex justify={"between"} align={"start"}>
        <PageHeader
          className="pt-2"
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <PasswordReset />
      </Flex>
      <Profile />
    </Grid>
  );
}
