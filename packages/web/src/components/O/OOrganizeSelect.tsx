import { useMemo, useState } from "react";
import OSelect from "./OSelect";
import useStoryInst from "@/contexts/StoryContext/useStoryInst";

type OOrganizeSelectProps = Omit<React.ComponentProps<typeof OSelect>, 'options'> & {
  currentId?: string;
}

export default function OOrganizeSelect(props: OOrganizeSelectProps) {
  const { currentId, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false)
  const [storyInst] = useStoryInst();
  const organizeInsts = useMemo(() => storyInst.listOrganizes(), [storyInst]);
  const organizeMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    organizeInsts.forEach(inst => {
      const parentId = inst.affiliatedId || 'root';
      if (!map[parentId]) {
        map[parentId] = [];
      }
      map[parentId].push(inst.id);
    });
    return map;
  }, [organizeInsts]);
  const getOptionsById = (id: string, level = 1) => {
    if (currentId === id) return [];
    const ids = organizeMap[id]
    if (!ids) return [];
    return ids.reduce<React.ComponentProps<typeof OSelect>['options'][0]['options']>((list, childId) => {
      let label = storyInst.findOrganizeById(childId)!.name
      if (isOpen) {
        label = Array(level).fill('\u00A0\u00A0').join('') + label
      }
      list.push({
        value: childId,
        label: label,
        disabled: childId === currentId,
      })
      list.push(...getOptionsById(childId, level + 1))
      return list
    }, [])
  }
  const options = useMemo(() => {
    return [{
      options: [
        { label: '<Root>', value: 'root' },
        ...getOptionsById('root'),
      ],
    }]
  }, [currentId, isOpen])
  return (<>
    <OSelect {...rest} options={options} onOpenChange={(status) => setIsOpen(status)} />
  </>)
}
