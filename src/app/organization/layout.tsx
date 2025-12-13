"use client";

import Header from "@/components/header";
import { useIsMounted } from "@/hooks/use-is-mounted";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <Header>{children}</Header>;
}
