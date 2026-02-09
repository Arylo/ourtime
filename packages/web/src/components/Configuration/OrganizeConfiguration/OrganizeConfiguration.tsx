import { useEffect, useMemo, useState } from "react";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import { Empty, EmptyContent, EmptyTitle } from "../../ui/empty";
import { Button } from "../../ui/button";
import OrganizeConfigurationCard from "./OrganizeConfigurationCard";
import OrganizeConfigurationTree from "./OrganizeConfigurationTree";
import OrganizeIdContext from "./OrganizeIdContext";
import ConfigurationCard from "../ConfigurationCard";
import OButtonSuspense from "@/components/O/OButtonSuspense";
import OGroupAddButton from "@/components/O/OGroupAddButton";

export default function OrganizeConfiguration () {
  const [id, setId] = useState<string>('');
  const [storyInst, setStoryInst] = useStoryInst()
  const organizeInsts = useMemo(() => storyInst.listOrganizes(), [storyInst])
  const newOrganize = () => {
    const { id: organizeId } = storyInst.appendOrganize({ name: 'New Organization' })
    setStoryInst(storyInst)
    setId(organizeId)
  }
  useEffect(() => {
    const rootInsts = organizeInsts.filter(inst => !inst.affiliatedId)
    if (rootInsts.length) {
      setId(rootInsts[0].id)
    }
  }, [])
  return <>
    {
      organizeInsts.length === 0 ? <>
        <Empty>
          <EmptyTitle>No organizations in the story.</EmptyTitle>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="cursor-pointer" variant={'outline'} onClick={newOrganize}>Create Organization</Button>
          </EmptyContent>
        </Empty>
      </> : <>
        <OrganizeIdContext.Provider value={{ id, setId }}>
          <div className="flex flex-col gap-2">
            <ConfigurationCard
              title="Organization Structure"
              action={<OButtonSuspense><OGroupAddButton onClick={() => newOrganize()} /></OButtonSuspense>}
            >
              <OrganizeConfigurationTree />
            </ConfigurationCard>
            {
              !id ? <></> : <OrganizeConfigurationCard />
            }
          </div>
        </OrganizeIdContext.Provider>
      </>
    }
  </>
}
