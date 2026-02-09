import { createContext } from 'react';
import type CONFIGURATION_TYPE from '../../constants/CONFIGURATION_TYPE';

export interface ConfigurationEditorContextType {
  configurationType: CONFIGURATION_TYPE;
  setConfigurationType: (configurationType: CONFIGURATION_TYPE) => void;
}

const ConfigurationEditorContext = createContext<ConfigurationEditorContextType>(undefined!);

export default ConfigurationEditorContext;
