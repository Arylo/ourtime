import OBaseButton from "./OBaseButton";

export default function ODeleteButton(props: Omit<React.ComponentProps<typeof OBaseButton>, "icon">) {
  return <OBaseButton
    icon={"i-material-symbols-light-delete-outline hover:i-material-symbols-light-delete"}
    {...props}
  />
}
