import { useMemo } from "react";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import { Empty, EmptyContent, EmptyTitle } from "../../ui/empty";
import { Button } from "../../ui/button";
import ItemConfigurationCard from "./ItemConfigurationCard";

export default function ItemConfiguration () {
  const [storyInst, setStoryInst] = useStoryInst()
  const itemInsts = useMemo(() => storyInst.listItems(), [storyInst])
  const newItem = () => {
    storyInst.appendItem({ name: 'New Item' })
    setStoryInst(storyInst)
  }
  return <>
    {
      itemInsts.length === 0 ? <>
        <Empty>
          <EmptyTitle>No items in the story.</EmptyTitle>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="cursor-pointer" variant={'outline'} onClick={newItem}>Create Item</Button>
          </EmptyContent>
        </Empty>
      </> : <>
        <div className="flex flex-col gap-2">
          {
            itemInsts.map(itemInst => (
              <ItemConfigurationCard
                key={itemInst.id}
                itemInst={itemInst}
              ></ItemConfigurationCard>
            ))
          }
          <Button onClick={newItem} className="w-full cursor-pointer shadow-sm">Append Item</Button>
        </div>
      </>
    }
  </>
}
