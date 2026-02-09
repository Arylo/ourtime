import React, { useEffect, useState, type ReactNode } from 'react';
import ConfigurationEditorContext from './ConfigurationEditorContext';
import CONFIGURATION_TYPE from '../../constants/CONFIGURATION_TYPE';
import useCurrentStoryInst from '../StoryContext/useCurrentStoryInst';

export interface EditorProviderProps {
  children: ReactNode;
}

const ConfigurationEditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [configurationType, setConfigurationType] = useState<CONFIGURATION_TYPE>();
  const story = useCurrentStoryInst()
  useEffect(() => {
    const savedConfigurationType = sessionStorage.getItem(`${story.id}.configurationType`);
    if (savedConfigurationType) {
      setConfigurationType(JSON.parse(savedConfigurationType));
    }
  }, [])
  useEffect(() => {
    if (configurationType) {
      sessionStorage.setItem(`${story.id}.configurationType`, JSON.stringify(configurationType));
    }
  }, [configurationType])
  return (
    <ConfigurationEditorContext.Provider value={{ configurationType: configurationType!, setConfigurationType }}>
      {children}
    </ConfigurationEditorContext.Provider>
  );
};

export default ConfigurationEditorProvider
