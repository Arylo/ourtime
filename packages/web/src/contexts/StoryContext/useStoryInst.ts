import { useContext } from 'react';
import StoryContext from './StoryContext';

const useStoryInst = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('must be used within a StoryProvider');
  }
  return [context.story, context.setStory] as const;
};

export default useStoryInst
