import ConfigurationEditorProvider from "../../contexts/ConfigurationEditorContext/ConfigurationEditorProvider";
import StoryProvider from "../../contexts/StoryContext/StoryProvider";
import { Outlet, useParams } from "react-router";

export default function PageProvider () {
  const { storyId } = useParams();
  return <>
    <StoryProvider storyId={storyId!}>
    <ConfigurationEditorProvider>
    <Outlet />
    </ConfigurationEditorProvider>
    </StoryProvider>
  </>
}
