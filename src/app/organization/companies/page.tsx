import { metaObject } from "@/config/site.config";
import Companies from "@/features/companies";

export const metadata = {
  ...metaObject("Organization - Companies"),
};

export default function companiesPage() {
  return (
    <div className="@container">
      <Companies />
    </div>
  );
}
