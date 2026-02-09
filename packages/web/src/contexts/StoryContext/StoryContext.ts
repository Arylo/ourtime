import { createContext } from 'react';
import type { StoryInstance } from '@ourtime/datatypes';

export interface StoryContextType {
  story: StoryInstance;
  setStory: (story: StoryInstance) => void;
}

const StoryContext = createContext<StoryContextType>(undefined!);

export default StoryContext;
