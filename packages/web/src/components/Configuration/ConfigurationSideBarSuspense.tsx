import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"

export default function ConfigurationSideBarSuspense ({ children }: { children: React.ReactNode }) {
  const loading = <>
    <div className="py-5 px-2 h-full w-[55px] flex flex-col gap-2">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
    </div>
  </>
  return <Suspense fallback={loading}>
    {children}
  </Suspense>
}
