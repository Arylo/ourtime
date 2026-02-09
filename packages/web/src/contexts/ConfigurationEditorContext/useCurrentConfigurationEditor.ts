import CONFIGURATION_TYPE from "@/constants/CONFIGURATION_TYPE";
import useConfigurationEditor from "./useConfigurationEditor";

const useCurrentConfigurationEditor = () => {
  const [configurationType] = useConfigurationEditor();
  return configurationType ?? CONFIGURATION_TYPE.NONE;
};

export default useCurrentConfigurationEditor;
