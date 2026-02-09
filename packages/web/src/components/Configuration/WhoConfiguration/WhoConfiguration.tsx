import { useMemo } from "react";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import { Empty, EmptyContent, EmptyTitle } from "../../ui/empty";
import { Button } from "../../ui/button";
import WhoConfigurationCard from "./WhoConfigurationCard";

export default function WhoConfiguration () {
  const [storyInst, setStoryInst] = useStoryInst()
  const whoInsts = useMemo(() => storyInst.listWhos(), [storyInst])
  const newWho = () => {
    storyInst.appendWho({ name: 'New Character' })
    setStoryInst(storyInst)
  }
  return <>
    {
      whoInsts.length === 0 ? <>
        <Empty>
          <EmptyTitle>No characters in the story.</EmptyTitle>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="cursor-pointer" variant={'outline'} onClick={newWho}>Create Character</Button>
          </EmptyContent>
        </Empty>
      </> : <>
        <div className="flex flex-col gap-2">
          {
            whoInsts.map(whoInst => (
              <WhoConfigurationCard
                key={whoInst.id}
                whoInst={whoInst}
              ></WhoConfigurationCard>
            ))
          }
          <Button onClick={newWho} className="w-full cursor-pointer shadow-sm">Append Character</Button>
        </div>
      </>
    }
  </>
}
