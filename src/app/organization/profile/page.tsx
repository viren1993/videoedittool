import { metaObject } from "@/config/site.config";
import Profile from "@/features/profile";
import { Grid } from "@radix-ui/themes";

export const metadata = {
  ...metaObject("Organization profile page"),
};

export default function ProfilePage() {
  return (
    <Grid className="@container">
      <Profile />
    </Grid>
  );
}
