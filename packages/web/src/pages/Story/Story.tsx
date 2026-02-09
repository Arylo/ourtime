import { lazy } from "react";
import useCurrentConfigurationEditor from "@/contexts/ConfigurationEditorContext/useCurrentConfigurationEditor";
import CONFIGURATION_TYPE from "@/constants/CONFIGURATION_TYPE";
import ConfigurationSubSideBarSuspense from "@/components/Configuration/ConfigurationSubSideBarSuspense";
import ConfigurationSideBarSuspense from "@/components/Configuration/ConfigurationSideBarSuspense";
import { ResizablePanel, ResizablePanelGroup } from "../../components/ui/resizable";

const ConfigurationSideBar = lazy(() => import("../../components/Configuration/ConfigurationSideBar"));
const ConfigurationSubSideBar = lazy(() => import("../../components/Configuration/ConfigurationSubSideBar"));

export default function Story () {
  const configurationType = useCurrentConfigurationEditor()

  return <>
    <ResizablePanelGroup>
      <ConfigurationSideBarSuspense>
        <ConfigurationSideBar />
      </ConfigurationSideBarSuspense>
      <ConfigurationSubSideBarSuspense>
        {
          configurationType === CONFIGURATION_TYPE.NONE ? null : <ConfigurationSubSideBar />
        }
      </ConfigurationSubSideBarSuspense>
      <ResizablePanel>Three</ResizablePanel>
    </ResizablePanelGroup>
  </>
}
