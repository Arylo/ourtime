import useConfigurationEditor from "../../contexts/ConfigurationEditorContext/useConfigurationEditor";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import CONFIGURATION_TYPE from "../../constants/CONFIGURATION_TYPE";
import cc from "classcat";

const SIDE_LIST = [
  { className: 'i-material-symbols-light-book-2-outline', type: CONFIGURATION_TYPE.STORY },
  { className: 'i-material-symbols-light-calendar-month-outline', type: CONFIGURATION_TYPE.CALENDAR },
  { className: 'i-material-symbols-light-family-group', type: CONFIGURATION_TYPE.ORGANIZE },
  { className: 'i-material-symbols-light-person', type: CONFIGURATION_TYPE.WHO },
  { className: 'i-material-symbols-light-box-outline', type: CONFIGURATION_TYPE.ITEM },
]

export default function ConfigurationSideBar () {
  const [configurationType, setConfigurationType] = useConfigurationEditor()
  return <>
    <ResizablePanel
      maxSize={50}
      minSize={50}
      className="flex flex-col gap-2 py-5"
    >
      {
        SIDE_LIST.map((item) => (
          <div
            key={item.type}
            className={cc([
              "size-[50px] cursor-pointer",
              "flex justify-center items-center",
              { "bg-gray-200": item.type === configurationType }
            ])}
            onClick={() => setConfigurationType(item.type === configurationType ? CONFIGURATION_TYPE.NONE : item.type)}
          >
            <div className={cc([
              "size-7",
              item.className,
            ])}>
            </div>
          </div>
        ))
      }
    </ResizablePanel>
    <ResizableHandle className="bg-gray-200" />
  </>
}
