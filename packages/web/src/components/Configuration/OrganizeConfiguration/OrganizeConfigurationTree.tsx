import OTree from "@/components/O/OTree";
import OTreeItem from "@/components/O/OTreeItem";
import { Level1Icon, Level2Icon, Level3Icon, Level4Icon, Level5Icon, Level6Icon, Level7Icon, Level8Icon, Level9Icon } from "./OrganizeLeverIcon";
import useStoryInst from "@/contexts/StoryContext/useStoryInst";
import { useContext, useMemo } from "react";
import OrganizeIdContext from "./OrganizeIdContext";

const LevelList = [
  Level1Icon,
  Level2Icon,
  Level3Icon,
  Level4Icon,
  Level5Icon,
  Level6Icon,
  Level7Icon,
  Level8Icon,
  Level9Icon,
] as const;

export default function OrganizeConfigurationTree() {
  const { id, setId } = useContext(OrganizeIdContext)
  const [storyInst] = useStoryInst()
  const organizeInsts = useMemo(() => storyInst.listOrganizes(), [storyInst])
  const organizeRootInsts = useMemo(() => organizeInsts.filter(inst => !inst.affiliatedId), [organizeInsts])
  const Items = ({ instList, level = 1 }: { instList: typeof organizeInsts, level?: number }) => (<>{
    instList.map(organizeInst => {
      const LevelComponent = LevelList[level - 1]
      return <>
        <OTreeItem
          key={organizeInst.id}
          label={organizeInst.name}
          icon={LevelList[level - 1] ? <LevelComponent className="size-full" active={id === organizeInst.id} /> : <></>}
          onClick={() => setId(organizeInst.id)}
        >
          <Items instList={organizeInst.listSubOrganizes()} level={level + 1} />
        </OTreeItem>
      </>
    })
  }</>)
  return (
    <OTree>
      <Items instList={organizeRootInsts} />
    </OTree>
  )
}
