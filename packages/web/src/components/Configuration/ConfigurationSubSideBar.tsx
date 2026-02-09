import CONFIGURATION_TYPE from "../../constants/CONFIGURATION_TYPE"
import useCurrentConfigurationEditor from "../../contexts/ConfigurationEditorContext/useCurrentConfigurationEditor"
import { ResizableHandle, ResizablePanel } from "../ui/resizable"
import { match } from "ts-pattern"
import { lazy, Suspense } from "react"
import { Skeleton } from "../ui/skeleton"

const StoryConfiguration = lazy(() => import('./StoryConfiguration/StoryConfiguration'))
const CalendarConfiguration = lazy(() => import('./CalendarConfiguration/CalendarConfiguration'))
const OrganizeConfiguration = lazy(() => import('./OrganizeConfiguration/OrganizeConfiguration'))
const WhoConfiguration = lazy(() => import('./WhoConfiguration/WhoConfiguration'))
const ItemConfiguration = lazy(() => import('./ItemConfiguration/ItemConfiguration'))

export default function ConfigurationSubSideBar () {
  const configurationType = useCurrentConfigurationEditor()
  return <>
    <ResizablePanel
      maxSize={500}
      minSize={300}
      className="p-4 h-[calc(100dvh-46px)] overflow-y-auto"
    >

      <h2 className="leading-[40px]">
        {
          match(configurationType)
            .with(CONFIGURATION_TYPE.STORY, () => 'Story Settings')
            .with(CONFIGURATION_TYPE.CALENDAR, () => 'Calendar Settings')
            .with(CONFIGURATION_TYPE.ORGANIZE, () => 'Organize Settings')
            .with(CONFIGURATION_TYPE.WHO, () => 'People Settings')
            .with(CONFIGURATION_TYPE.ITEM, () => 'Item Settings')
            .otherwise(() => null)
        }
      </h2>
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded-xl" />}>
        {
          match(configurationType)
            .with(CONFIGURATION_TYPE.STORY, () => <StoryConfiguration />)
            .with(CONFIGURATION_TYPE.CALENDAR, () => <CalendarConfiguration />)
            .with(CONFIGURATION_TYPE.ORGANIZE, () => <OrganizeConfiguration />)
            .with(CONFIGURATION_TYPE.WHO, () => <WhoConfiguration />)
            .with(CONFIGURATION_TYPE.ITEM, () => <ItemConfiguration />)
            .otherwise(() => null)
        }
      </Suspense>
    </ResizablePanel>
    <ResizableHandle className="bg-gray-200" />
  </>
}
