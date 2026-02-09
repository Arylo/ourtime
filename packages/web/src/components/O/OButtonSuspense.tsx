import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export default function OButtonSuspense ({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Skeleton className="size-6" />}>
    {children}
  </Suspense>
}
