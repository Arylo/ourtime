import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const PageHeader = lazy(() => import("./PageHeader"));
const PageBody = lazy(() => import("./PageBody"));

const SkeletonGroup = () => {
  return <>
    <div className="flex flex-nowrap flex-row gap-2 overflow-y-hidden">
      {
        Array(10).fill(void 0).map(() => {
          return <Skeleton className="min-w-1/9 h-4" />
        })
      }
    </div>
  </>
}

export default function PageRoot () {
  return <div className="w-dvw h-dvh max-w-dvw max-h-dvh flex flex-col">
    <div className="w-full h-[46px] flex flex-row items-center border-b border-gray-300">
      <Suspense fallback={<SkeletonGroup />}>
        <PageHeader />
      </Suspense>
    </div>
    <div className="w-full">
      <Suspense fallback={null}>
        <PageBody />
      </Suspense>
    </div>
  </div>
}
