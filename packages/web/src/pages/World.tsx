import type { WorldInstance } from "@ourtime/datatypes";

interface WorldProps {
  world: WorldInstance;
}

export default function World (props: WorldProps) {
  const { world } = props;
  return <>
    <div>{world.getName()}</div>
  </>
}
