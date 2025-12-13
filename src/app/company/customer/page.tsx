import { metaObject } from "@/config/site.config";
import Customer from "@/features/customer";

export const metadata = {
  ...metaObject("Customer Table"),
};

export default function CustomerPage() {
  return (
    <div className="@container">
      <Customer />
    </div>
  );
}
