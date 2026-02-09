import { useContext } from 'react';
import ConfigurationEditorContext from './ConfigurationEditorContext';

const useConfigurationEditor = () => {
  const context = useContext(ConfigurationEditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return [context.configurationType, context.setConfigurationType] as const;
}

export default useConfigurationEditor
