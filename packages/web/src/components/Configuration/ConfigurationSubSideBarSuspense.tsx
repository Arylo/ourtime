import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"

export default function ConfigurationSubSideBarSuspense ({ children }: { children: React.ReactNode }) {
  const loading = <>
    <div className="p-4 h-full w-[400px] flex flex-col gap-6">
      <Skeleton className="h-[36px] w-full" />
      <Skeleton className="h-[90px] w-full" />
    </div>
  </>
  return <Suspense fallback={loading}>
    {children}
  </Suspense>
}
