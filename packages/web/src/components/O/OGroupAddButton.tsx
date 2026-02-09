import OBaseButton from "./OBaseButton";

export default function OGroupAddButton(props: Omit<React.ComponentProps<typeof OBaseButton>, "icon">) {
  return <OBaseButton
    icon={"i-material-symbols-light-group-add-outline hover:i-material-symbols-light-group-add"}
    {...props}
  />
}
