import OBaseButton from "./OBaseButton";

export default function OSaveButton(props: Omit<React.ComponentProps<typeof OBaseButton>, "icon">) {
  return <OBaseButton
    icon={"i-material-symbols-light-save-outline hover:i-material-symbols-light-save"}
    {...props}
  />
}
