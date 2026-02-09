import OBaseButton from "./OBaseButton";

export default function OEditButton(props: Omit<React.ComponentProps<typeof OBaseButton>, "icon">) {
  return <OBaseButton
    icon={"i-material-symbols-light-edit-outline hover:i-material-symbols-light-edit"}
    {...props}
  />
}
