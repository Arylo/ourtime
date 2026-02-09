import useStoryInst from './useStoryInst';

const useCurrentStoryInst = () => {
  const [storyInst] = useStoryInst()
  return storyInst;
};

export default useCurrentStoryInst
