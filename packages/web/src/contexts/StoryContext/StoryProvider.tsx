import React, { useCallback, useEffect, useState, type ReactNode } from 'react';
import StoryContext, { type StoryContextType } from './StoryContext';
import { getStory, saveStory } from '@ourtime/store';

export interface StoryProviderProps {
  storyId: string;
  children: ReactNode;
}

const StoryProvider: React.FC<StoryProviderProps> = ({ children, storyId }) => {
  const [storyInst, setStoryInst] = useState<StoryContextType['story']>(getStory(storyId));
  const refreshStoryInst = useCallback(() => {
    setStoryInst(getStory(storyId));
  }, [storyId]);
  const setStory = (story: StoryContextType['story']) => {
    saveStory(storyId, story);
    refreshStoryInst();
  }
  useEffect(() => {
    refreshStoryInst()
  }, [storyId])
  return (
    <StoryContext.Provider value={{ story: storyInst, setStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryProvider
